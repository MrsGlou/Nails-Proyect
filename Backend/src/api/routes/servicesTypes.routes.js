const express = require('express');
const {
  create,
  update,
  deleteServiceType,
} = require('../controllers/servicesTypes.controller');
const {
  isAuthAdmin,
  isAuthSuperAdmin,
} = require('../../middlewares/auth.middleware');
const ServiceTypeRoutes = express.Router();

ServiceTypeRoutes.post('/create', [isAuthSuperAdmin], [isAuthAdmin], create);
ServiceTypeRoutes.patch(
  '/update/update',
  [isAuthSuperAdmin],
  [isAuthAdmin],
  update
);
ServiceTypeRoutes.post(
  '/deleteservicetype',
  [isAuthSuperAdmin],
  [isAuthAdmin],
  deleteServiceType
);

module.exports = ServiceTypeRoutes;
