const dotenv = require('dotenv');
const Appointment = require('../models/appointment.model');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const setError = require('../../helpers/handle-error');
const Service = require('../models/service.model');

dotenv.config();

//--------- CREATE APPOINTMENT ---------//
const create = async (req, res, next) => {
  try {
    await Appointment.syncIndexes();
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const userId = req.body.user;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send('El empleado no existe.');
    }

    const servicesIds = req.body.service;
    const services = await Service.find({
      _id: { $in: servicesIds },
    });

    let totalTime = 0;
    let totalPrice = 0;

    if (!services) {
      res.status(400).send('Algunos de los servicios no existen.');
      return;
    } else {
      services.forEach((service) => {
        totalTime += service.time;
        totalPrice += service.price;
      });
    }

    const startTime = new Date(
      `1970-01-01T${req.body.appointmentStart}:00`
    ).getTime();
    let endTime = new Date(startTime + totalTime * 60000).toLocaleTimeString();
    endTime = endTime.slice(0, 5);

    const newAppointment = new Appointment({
      ...req.body,
      appointmentEnd: endTime,
      totalPrice: totalPrice,
      totalTime: totalTime,
      user: req.body.user,
      day: req.body.selectedDate,
    });

    try {
      console.log(newAppointment);
      const createAppointment = await newAppointment.save();

      if (createAppointment) {
        const user = await User.findById(req.body.user);

        try {
          user.appointment.push(newAppointment._id);
          await User.findByIdAndUpdate(req.body.user, user);
        } catch (error) {
          return next(error);
        }

        //-----------Enviamos correo con la nueva cita ----------//
        const mailOptions = {
          from: email,
          to: req.body.email,
          subject: 'Tu cita ha sido registrada con exito',
          text: `Hola ${req.body.name}, hemos registrado tu cita para el día ${req.body.selectedDate} a las ${req.body.appointmentStart}. Muchas gracias por confiar en moon manicure`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        return res.status(200).json({
          appointment: createAppointment,
          updateUser: await User.findById(userId).populate('appointment'),
        });
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error create appointment'
      )
    );
  }
};

//--------- VERIFY APPOINTMENT ---------//
const verifyOutside = async (req, res, next) => {
  try {
    const { id } = req.body.id;
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: 'tu_usuario@example.com',
      to: appointment.email,
      subject: 'Confirmación de cita',
      text: `Estimado cliente:
      Esta es una confirmación de su cita del día ${
        appointment.appointmentStart
      }.        
      Para verificar su cita, haga clic en el siguiente enlace: 
      ${'/appointment/verify/:id'}
      Gracias,
      El equipo de citas
    `,
    };

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json('Appointment not found');
    }
    if (appointment.state === 'verify') {
      return res.json({ message: 'La cita ya fue validada por el cliente.' });
    } else {
      try {
        await transporter.sendMail(mailOptions);
        appointment.validated = true;
        appointment.state = 'verify';
        appointment.save(appointment);
        console.log('Correo enviado correctamente.');
        return true;
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        return false;
      }
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error verify appointment'
      )
    );
  }
};

//--------- CLOSED APPOINTMENT ---------//
const closedAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const appointmentExists = await Appointment.findById(id);

    if (!appointmentExists) {
      return res.status(404).json('This appointmentn dont exists');
    } else {
      await Appointment.findByIdAndUpdate(id, {
        state: 'closed',
      });

      return res.status(200).json(appointmentExists);
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error closed appointment'
      )
    );
  }
};

//--------- DELETE APPOINTMENT ---------//
const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);

    if (await Appointment.findById(id)) {
      return res.status(404).json('Error deleting appointment');
    } else {
      await User.updateMany(
        { appointment: id },
        { $pull: { appointment: id } }
      );

      return res.status(200).json('Ok delete appointment');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error delete appointment'
      )
    );
  }
};

//--------- GET DISPONIBILITY APPOINTMENT ---------//
//5. Calcula las citas disponibles en función de la duración de la cita(GET DISPONIBILITY -> Appointment)
const getAvailableAppointment = async (req, res, next) => {
  try {
    //Traaemos los servicios que el cliente solicita y miramos el timepo total
    const date = req.body.selectedDate;
    const servicesIds = req.body.selectedServices;

    const dayNumberToDayString = (dayIndex) => {
      return [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][dayIndex];
    };

    //Nos quedamos solo con el dia para ver el dia de la semana que es
    const newDate = new Date(date);

    //Nos traemos los servicios de la bbdd y calculamos el tiempo total
    const services = await Service.find({
      _id: { $in: servicesIds },
    });
    let totalTime = 0;

    services.forEach((service) => {
      totalTime += service.time;
    });

    //Nos traemos los ids de los usuarios que tienen el rol basico
    const rol = 'basic';
    const usersBasic = await User.find({ rol: rol });

    if (!usersBasic) {
      return next(setError(409, 'There are no basic users'));
    }

    //Traemos todas las citas
    const appointments = await Appointment.find({ day: date });
    const day = dayNumberToDayString(newDate.getDay());

    //Haccemos un nuevo array con los ids de los usuarios y sus citas pendientes
    const usersAppointments = new Map();

    for (let userBasic of usersBasic) {
      let appointmentByUser = new Array();

      for (let appointment of appointments) {
        if (appointment.user.equals(userBasic._id)) {
          appointmentByUser.push(appointment);
        }
      }

      usersAppointments.set(userBasic._id.toString(), appointmentByUser);
    }

    const finalMap = new Map();

    //Creamos el objeto con todas las horas disponibles por usuario
    for (let userAppointments of usersAppointments) {
      let times = new Map();

      //Miramos que el dia sea entre diario para todas las horas y los sabados solo por la mañana

      if (day !== 'Saturday' && day !== 'Sunday') {
        times.set('09:00', true);
        times.set('09:30', true);
        times.set('10:00', true);
        times.set('10:30', true);
        times.set('11:00', true);
        times.set('11:30', true);
        times.set('12:00', true);
        times.set('12:30', true);
        times.set('13:00', true);
        times.set('13:30', true);
        times.set('14:00', false);
        times.set('16:00', true);
        times.set('16:30', true);
        times.set('17:00', true);
        times.set('17:30', true);
        times.set('18:00', true);
        times.set('18:30', true);
        times.set('19:00', true);
        times.set('19:30', true);
        times.set('20:00', false);
      } else if (day === 'Saturday') {
        times.set('09:00', true);
        times.set('09:30', true);
        times.set('10:00', true);
        times.set('10:30', true);
        times.set('11:00', true);
        times.set('11:30', true);
        times.set('12:00', true);
        times.set('12:30', true);
        times.set('13:00', true);
        times.set('13:30', true);
        times.set('14:00', false);
      }

      //Miramos los tiempos a los que empieza una cita y yas horas ocupadas las cambiamos a false
      for (let appointment of userAppointments[1]) {
        const startTime = appointment.appointmentStart;
        const endTime = appointment.appointmentEnd;

        //Comporbamos que las horas estan disponibles

        for (let time of times) {
          if (
            (time[0] > startTime && time[0] < endTime) ||
            time[0] === startTime
          ) {
            times.set(time[0], false);
          }
        }
      }

      let availableTimes = [];

      //Introducimos las horas disponibles en el nuevo array

      for (let time of times) {
        if (time[1] && totalTime === 30) {
          availableTimes.push(time[0]);
        } else if (time[1]) {
          let timeCounter = 30;

          while (timeCounter < totalTime) {
            //console.log(time[0]);
            let appointmentTime = new Date(
              `1970-01-01T${time[0]}:00Z`
            ).getTime();
            let timeCounterSec = timeCounter * 60000;
            let totalTimeAppointment = new Date(
              appointmentTime + timeCounterSec
            );

            let nextAppointment = totalTimeAppointment
              .toISOString()
              .substr(11, 5);
            //console.log(nextAppointment);

            timeCounter += 30;

            if (times.get(nextAppointment)) {
              if (timeCounter === totalTime) {
                availableTimes.push(time[0]);
                break;
              }
            } else {
              break;
            }
          }
        }
      }
      finalMap.set(userAppointments[0], availableTimes);
    }
    const finalObj = Object.fromEntries(finalMap);

    return res.status(200).json(finalObj);
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get all future appointment'
      )
    );
  }
};

//--------- GET ALL APPOINTMENT ---------//
const getAll = async (req, res, next) => {
  try {
    const appointmentAll = await Appointment.find().populate('user');
    if (appointmentAll) {
      return res.status(200).json(appointmentAll);
    } else {
      return res.status(404).json('Faliled Get All controller to appointment');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error Get All appointment'
      )
    );
  }
};

//--------- GET BY DAY APPOINTMENT ---------//
const getByDay = async (req, res, next) => {
  try {
    const date = req.body.date;
    const appointmentsByDay = await Appointment.find({ day: date })
      .populate('user')
      .populate('service')
      .sort({ appointmentStart: 1 });

    if (appointmentsByDay.length > 0) {
      return res.status(200).json(appointmentsByDay);
    } else {
      return res.status(200).json(appointmentsByDay);
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get by day appointment'
      )
    );
  }
};

//--------- GET BY ID ---------//
const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointmentID = await Appointment.findById(id).populate('user');
    if (appointmentID) {
      return res.status(200).json(appointmentID);
    } else {
      return res.status(404).json('Error controller Get By ID Appointment');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error Get By ID Appointment'
      )
    );
  }
};

module.exports = {
  create,
  verifyOutside,
  closedAppointment,
  deleteAppointment,
  getAvailableAppointment,
  getAll,
  getByDay,
  getByID,
};
