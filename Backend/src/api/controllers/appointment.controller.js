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
    const services = await Service.findById(servicesIds);
    if (!services) {
      res.status(400).send('Algunos de los servicios no existen.');
      return;
    }
    const newAppointment = new Appointment({
      ...req.body,
      user: req.body.user,
      service: req.body.service,
    });

    try {
      console.log(newAppointment);
      const createAppointment = await newAppointment.save();

      if (createAppointment) {
        const user = await User.findById(req.body.user);
        let updateUser;

        try {
          user.appointments.push(newAppointment._id);
          updateUser = await User.findByIdAndUpdate(req.body.user, user);
        } catch (error) {
          return next(error);
        }

        //-----------Enviamos correo con la nueva cita ----------//
        const mailOptions = {
          from: email,
          to: req.body.email,
          subject: 'Tu cita ha sido registrada con exito',
          text: `Hola ${req.body.name}, hemos registrado tu cita para el día ${req.body.appointmentStart}`,
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

//--------- MODIFY APPOINTMENT ---------//
const update = async (req, res, next) => {
  try {
    await Appointment.syncIndexes();
    const { id } = req.params;
    const patchAppointment = new Appointment(req.body);
    patchAppointment._id = id;
    patchAppointment.state = req.body.state;

    try {
      await Appointment.findByIdAndUpdate(id, patchAppointment);
      const updateAppointment = await Appointment.findById(id);

      if (!updateAppointment) {
        return res.status(404).json('Appointment not found');
      }

      const updateKeys = Object.keys(req.body);
      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateAppointment[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });
      return res.status(200).json({
        testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error update appointment'
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
    const { _id } = req.params;
    const appointmentExists = await Appointment.findById(_id);
    if (!appointmentExists) {
      return res.status(404).json('This appointmentn dont exists');
    } else {
      appointmentExists.state = 'closed';
      return res.stuatus(200).json('Status change to closed');
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
    const { _id } = req.params;
    await Appointment.findById(_id);

    if (await Appointment.findById(_id)) {
      return res.status(404).json('Not delete appointment');
    } else {
      await User.updateMany(
        { appointment: _id },
        { $pull: { appointment: _id } }
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
const getAviableAppointment = async (req, res, next) => {
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
    const appointments = await Appointment.find();

    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const dayOfMonth = newDate.getDate();
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

    //Creamos el objeto con todas las horas disponibles por usuario
    for (let userAppointments of usersAppointments) {
      let times = new Map();

      //Miramos que el dia sea entre diario para todas las horas y los sabados solo por la mañana

      if (day !== 'Saturday' && 'Sunday') {
        times.set(new Date(year, month, dayOfMonth, 9, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 9, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 10, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 10, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 11, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 11, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 12, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 13, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 14, 0).getTime(), false);
        times.set(new Date(year, month, dayOfMonth, 16, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 16, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 17, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 17, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 18, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 18, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 19, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 19, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 20, 0).getTime(), false);
      } else if (day === 'Saturday') {
        times.set(new Date(year, month, dayOfMonth, 9, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 9, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 10, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 10, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 11, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 11, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 12, 0).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 13, 30).getTime(), true);
        times.set(new Date(year, month, dayOfMonth, 14, 0).getTime(), false);
      }

      //Miramos los tiempos a los que empieza una cita y yas horas ocupadas las cambiamos a false
      for (let appointment of userAppointments[1]) {
        const startTime = appointment.appointmentStart.getTime();
        const endTime = appointment.appointmentEnd.getTime();

        for (let time of times) {
          if (time[0] === startTime) {
            console.log(new Date(time[0]));
            times.set(time[0], false);
          }
        }
      }
      console.log(times);
    }

    return res.status(200).json({ totalTime, usersAppointments });
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

//--------- GET BY EMAIL APPOINTMENT ---------//
const getByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const appointmentByEmail = await Appointment.find({ email }).populate(
      'user'
    );
    if (appointmentByEmail) {
      return res.status(200).json({ appointmentByEmail });
    } else {
      return res
        .status(404)
        .json('Error to controller getByEamil Appointments');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get by Email appointment'
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
  update,
  verifyOutside,
  closedAppointment,
  deleteAppointment,
  getAviableAppointment,
  getAll,
  getByEmail,
  getByID,
};
