const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const {
  register,
  validatedUser,
  resendCode,
  login,
  forgotPassword,
  sendPassword,
  changePassword,
  update,
  getAll,
  deleteUser,
  getById,
} = require('../controllers/user.controller');
const {
  isAuth,
  isAuthAdmin,
  isAuthSuperAdmin,
} = require('../../middlewares/auth.middleware');

const UserRoutes = express.Router();

UserRoutes.post('/register', upload.single('image'), register);
UserRoutes.post('/validated', validatedUser);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/login', login);
UserRoutes.patch('/forgotpassword', forgotPassword);
UserRoutes.patch('/changepassword', [isAuth], changePassword);
UserRoutes.patch(
  '/update/update',
  [isAuthAdmin],
  upload.single('image'),
  update
);

UserRoutes.get('/', getAll);
UserRoutes.get('/:id', getById);
UserRoutes.get('/forgotpassword/sendpassword/:id', sendPassword);
UserRoutes.delete('/:id', [isAuthSuperAdmin], [isAuthAdmin], deleteUser);

module.exports = UserRoutes;
