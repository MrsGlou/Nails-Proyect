const express = require('express');
const {
  create,
  update,
  deleteService,
  getAll,
  getByID,
} = require('../models/service.model');
const {
  isAuthAdmin,
  isAuthSuperAdmin,
} = require('../../middlewares/auth.middleware');
const ServiceRoutes = express.Router();

ServiceRoutes.post('/create', [isAuthSuperAdmin], [isAuthAdmin], create);
ServiceRoutes.post('/update', [isAuthSuperAdmin], [isAuthAdmin], update);
ServiceRoutes.post('/delete', [isAuthSuperAdmin], [isAuthAdmin], deleteService);
ServiceRoutes.post('/', getAll);
ServiceRoutes.post('/:id', getByID);

module.exports = ServiceRoutes;
