const express = require('express');
const {
  create,
  update,
  verifyOutside,
  closedAppointment,
  getAvailableAppointment,
  deleteAppointment,
  getAll,
  getByID,
  getByEmail,
} = require('../controllers/appointment.controller');
const {
  isAuthAdmin,
  isAuthSuperAdmin,
} = require('../../middlewares/auth.middleware');
const AppointmentRoutes = express.Router();

AppointmentRoutes.post('/create', create);
AppointmentRoutes.post('/verify', verifyOutside);
AppointmentRoutes.post('/closed', closedAppointment);
AppointmentRoutes.post('/available', getAvailableAppointment);
AppointmentRoutes.post('/delete', deleteAppointment);
AppointmentRoutes.get('/', getAll);
AppointmentRoutes.get('/:id', getByID);
AppointmentRoutes.get('/getEmail', getByEmail);

AppointmentRoutes.patch('/update/update', update);

module.exports = AppointmentRoutes;
