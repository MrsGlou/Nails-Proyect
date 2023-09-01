const express = require('express');
const {
  create,
  verifyOutside,
  closedAppointment,
  getAvailableAppointment,
  deleteAppointment,
  getAll,
  getByDay,
  getByID,
} = require('../controllers/appointment.controller');
const { isAuth } = require('../../middlewares/auth.middleware');
const AppointmentRoutes = express.Router();

AppointmentRoutes.post('/create', create);
AppointmentRoutes.post('/verify', verifyOutside);
AppointmentRoutes.patch('/closed/:id', [isAuth], closedAppointment);
AppointmentRoutes.post('/available', getAvailableAppointment);
AppointmentRoutes.post('/delete', deleteAppointment);
AppointmentRoutes.get('/', getAll);
AppointmentRoutes.post('/getbyday', [isAuth], getByDay);
AppointmentRoutes.get('/:id', getByID);
AppointmentRoutes.delete('/:id', [isAuth], deleteAppointment);

module.exports = AppointmentRoutes;
