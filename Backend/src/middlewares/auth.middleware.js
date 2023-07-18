const User = require('../api/models/user.model');
const { verifyToken } = require('../utils/getToken');
const dotenv = require('dotenv');
dotenv.config();

//Autorización para usuarios basicos, solo token
const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Unauthorized'));
  }
  try {
    //Decodificamos el token y sacamos el id y email
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

//Autorizacion para usuarios admin
const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Unauthorized'));
  }
  try {
    //Decodificamos el token y sacamos el id y email
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    //Si no eres admin no puedes hacer esto
    if (req.user.rol !== 'admin') {
      return next(new Error('Unauthorized, not admin'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthSuperAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Unauthorized'));
  }
  try {
    //Decodificamos el token y sacamos el id y email
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    //Si no eres admin no puedes hacer esto
    if (req.user.rol !== 'superAdmin') {
      return next(new Error('Unauthorized, not admin'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuth,
  isAuthAdmin,
  isAuthSuperAdmin,
};
