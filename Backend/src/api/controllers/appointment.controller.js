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

    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send('El empleado no existe.');
    }

    const servicesIds = req.body.services;
    const services = await Service.findById(servicesIds);
    if (services.length !== services.length) {
      res.status(400).send('Algunos de los servicios no existen.');
      return;
    }
    const newAppointment = new Appointment({
      ...req.body,
      user: req.body.userId,
      services: req.body.servicesIds,
    });

    try {
      const createAppointment = await newAppointment.save();

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
        user: await User.findById(userId).populate('appointment'),
      });
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

const sendVerify = async (req, res, next) => {};

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
const getDisponibilityAppointment = async (req, res, next) => {
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
    const day = dayNumberToDayString(newDate.getDay());

    //Nos traemos los servicios de la bbdd y calculamos el tiempo total
    const services = await Service.find({
      _id: { $in: servicesIds },
    });
    let totalTime = 0;

    services.forEach((service) => {
      totalTime += service.time;
    });

    // Revisamos que la cita esta dentro del horario laboral
    const isWithinHoursOfOperation =
      ((day === 'Monday' ||
        day === 'Tuesday' ||
        day === 'Wednesday' ||
        day === 'Thursday' ||
        day === 'Friday') &&
        10 <= new Date().getHours() &&
        new Date().getHours() <= 20) ||
      (day === 'Saturday' &&
        10 <= new Date().getHours() &&
        new Date().getHours() <= 15);
    if (!isWithinHoursOfOperation) {
      return res
        .status(400)
        .send("The appointment is not within the center's hours of operation.");
    }

    //Revisamos las citas de los empleados de ese día y los huecos libres los sacas en al respuesta
    const appointments = [];
    console.log([User]);
    for (const user of User) {
      for (const appointment of User.appointments) {
        if (appointment.day === day && appointment.time === totalTime) {
          appointments.push(appointment);
        }
      }
    }

    //Si no hay citas disponibles:
    if (appointments.length === 0) {
      return res.status(400).send('No disponibillity');
    } else {
      return res.status(200).send(appointments, totalTime);
    }
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
  getDisponibilityAppointment,
  getAll,
  getByEmail,
  getByID,
};
