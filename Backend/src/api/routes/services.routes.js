const express = require('express');
const { create } = require('../models/service.model');
const {
  isAuthAdmin,
  isAuthSuperAdmin,
} = require('../../middlewares/auth.middleware');
const ServiceRoutes = express.Router();

ServiceRoutes.post('/create', [isAuthSuperAdmin], [isAuthAdmin], create);

module.exports = ServiceRoutes;
