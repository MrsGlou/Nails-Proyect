const express = require('express');
const {
  create,
  update,
  deleteService,
  getAll,
  getByID,
  getByType,
} = require('../controllers/services.controller');

const {
  isAuthAdmin,
  isAuthSuperAdmin,
} = require('../../middlewares/auth.middleware');

const ServiceRoutes = express.Router();
//

ServiceRoutes.post('/create', [isAuthSuperAdmin], [isAuthAdmin], create);
ServiceRoutes.post('/delete', [isAuthSuperAdmin], [isAuthAdmin], deleteService);
ServiceRoutes.get('/', getAll);
ServiceRoutes.get('/:id', getByID);
ServiceRoutes.get('/type/:type', getByType);
ServiceRoutes.patch(
  '/update/update',
  [isAuthSuperAdmin],
  [isAuthAdmin],
  update
);

ServiceRoutes.delete('/', [isAuthSuperAdmin], [isAuthAdmin], deleteService);

module.exports = ServiceRoutes;
