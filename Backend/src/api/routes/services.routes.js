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
ServiceRoutes.get('/', getAll);
ServiceRoutes.get('/:id', getByID);
ServiceRoutes.get('/type/:type', getByType);
ServiceRoutes.patch(
  '/update/update/:id',
  [isAuthSuperAdmin],
  [isAuthAdmin],
  update
);

ServiceRoutes.delete('/:id', [isAuthSuperAdmin], [isAuthAdmin], deleteService);

module.exports = ServiceRoutes;
