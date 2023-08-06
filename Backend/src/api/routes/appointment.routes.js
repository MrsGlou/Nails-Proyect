const express = require('express');
const {
    create,
    update,
    verifyOutside,
    closedAppointment,
    getDisponibilityAppointment,
    deleteAppointment,
    getAll,
    getByID,
    getByEmail,
  } = require('../models/appointment.model');
const {
    isAuthAdmin,
    isAuthSuperAdmin,
  } = require('../../middlewares/auth.middleware');
const { getById } = require('../controllers/user.controller');
const AppointmentRoutes = express.Router();

AppointmentRoutes.post('/create', create);
AppointmentRoutes.patch('/update/update', update);
AppointmentRoutes.post('/verify', verifyOutside);
AppointmentRoutes.post('/closed', closedAppointment);
AppointmentRoutes.post('/disponibility', getDisponibilityAppointment);
AppointmentRoutes.post('/delete', deleteAppoitnment);
AppointmentRoutes.get('/', getAll);
AppointmentRoutes.get('/:id', getByID);
AppointmentRoutes.post('/getEmail', getByEmail);