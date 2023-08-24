const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const Appointment = require('../models/appointment.model');
const setError = require('../../helpers/handle-error');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');
const { generateToken } = require('../../utils/getToken');
const randomPassword = require('../../utils/randomPassword');
dotenv.config();

//--------- REGISTER ---------//
const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    //Creamos el codigo de confirmación
    const confirmationCode = Math.floor(
      Math.random() * (99999 - 50000) + 50000
    );
    let passwordSecure = randomPassword();
    const newPassword = bcrypt.hashSync(passwordSecure, 10);
    //Guardamos el usuario con el codigo de confirmación nuevo y la contraseña.
    const newUser = new User({
      ...req.body,
      confirmationCode,
      password: newPassword,
    });

    if (req.file) {
      //path es lo que contiene la url de cloudinary
      newUser.image = req.file.path;
    } else {
      newUser.image = 'https://cdn-icons-png.flaticon.com/512/16/16363.png';
    }

    //Buscamos si ya existe el usuario en la base de datos
    const userExists = await User.findOne({
      email: newUser.email,
    });

    if (userExists) {
      if (req.file) deleteImgCloudinary(catchImg);
      //llamamos al manejador de errores para que haga la ejecución
      return next(setError(409, 'This user already exist'));
    } else {
      try {
        const createUser = await newUser.save();
        createUser.password = null;

        //---- Enviamos el correo ----//
        const mailOptions = {
          from: email,
          to: req.body.email,
          subject: 'Code confirmation',
          text: `Your code is ${confirmationCode}, and your password is ${passwordSecure}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        return res.status(201).json({
          user: createUser,
          confirmationCode: confirmationCode,
          password: newPassword,
        });
      } catch (error) {
        return res.status(404).json(error.message);
      }
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(
      setError(error.code || 500, error.message || 'Failed create user')
    );
  }
};

//--------- VALIDATED NEW USER ---------//
const validatedUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json('User not found');
    } else {
      //Si el usuario existe verificamos el código y lo validamos
      if (confirmationCode === userExists.confirmationCode) {
        try {
          await userExists.updateOne({ validated: true });
          //Miramos que se ha acutalizado correctamente por medio de findOne (realiza un ternario)
          const updateUser = await User.findOne({ email });
          return res.status(200).json({
            testValidatedOk: !!updateUser.validated,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        await User.findByIdAndDelete(userExists._id);

        //Borramos imagen en cloudinay
        deleteImgCloudinary(userExists.image);
        //Devolvemos un 200 con el test del borrado
        return res.status(200).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))
            ? 'error delete user'
            : 'ok delete user',
        });
      }
    }
  } catch (error) {
    return next(setError(500, 'General error validated new user'));
  }
};

//--------- RESEND CODE CONFIRMATION ---------//
const resendCode = async (req, res, next) => {
  try {
    //Configuramos nodemailer
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: 'Code confirmation',
        text: `Your code is ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ resend: true });
        }
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return next(setError(500, error.message || 'General error resend code'));
  }
};

//--------- LOGIN ---------//
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //Si no hay usuario -> 404- User not found
    if (!user) {
      return res.status(404).json('User not found');
    } else {
      //Si hay usuario miramos que las contraseñas sean las mismas
      if (bcrypt.compareSync(password, user.password)) {
        //Si son correctas generamos token
        const token = generateToken(user._id, email);
        //Devolvemos el user auth y el token
        return res.status(200).json({
          user: user,
          token,
        });
      } else {
        // si la contraseña no esta correcta enviamos un 404 con el invalid password
        return res.status(404).json('Invalid password');
      }
    }
  } catch (error) {
    return next(
      setError(500 || error.code, error.message || 'General error login')
    );
  }
};

//--------- FORGOT PASSWORD ---------//
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      return res.redirect(
        `http://localhost:8083/api/v1/user/forgotpassword/sendpassword/${userDB._id}`
      );
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error change password'
      )
    );
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);

    //Conf email
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    //Generamos contraseña y se la mandamos por correo
    let passwordSecure = randomPassword();
    const mailOptions = {
      from: email,
      to: userDB.email,
      subject: 'New Password',
      text: `User: ${userDB.name}. Your new password is ${passwordSecure} We have sent this because we have a password change request. If it wasn't you, please contact us. Thank you.`,
    };

    //Mandamos el correo
    transporter.sendMail(mailOptions, async function (error) {
      if (error) {
        //Mandamos la respuesta con el error
        console.log(error);
        return res.status(404).json('Dont send email and dont update user');
      } else {
        //Encriptamos contrasesña y la guardamos
        const newPassword = bcrypt.hashSync(passwordSecure, 10);

        try {
          await User.findByIdAndUpdate(id, { password: newPassword });
          //Vemos que se ha guardado todo y hacemos un if comparando contraseñas
          const updateUser = await User.findById(id);
          if (bcrypt.compareSync(passwordSecure, updateUser.password)) {
            //Si son iguales mandamos un 200
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            //Si no son iguales le decimos al frontal que no se ha actualizado
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error send password'
      )
    );
  }
};

//--------- CHANGE PASSWORD ---------//
const changePassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    //Comparamos contraseñas y encriptamos nueva contraseña
    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      try {
        //Buscamos id de usuario y actualizamos contraseña
        await User.findByIdAndUpdate(_id, { password: newPasswordHash });
        const updateUser = await User.findById(_id);
        if (bcrypt.compareSync(newPassword, updateUser.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json('Password not match');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error change password'
      )
    );
  }
};

//--------- UPDATE USER ---------//
const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    //Actualizamos los indexes de los elementos unicos
    await User.syncIndexes();
    //Instanciamos el nuevo user
    const patchUser = new User(req.body);
    if (req.file) {
      patchUser.image = req.file.path;
    }
    //Las cosas que no quiero que se modifiquen las cojo de la req
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.validated = req.user.validated;
    patchUser.email = req.user.email;
    patchUser.appontments = req.user.appointments;

    //Buscamos el id y actualizamos.
    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);
      if (req.file) {
        deleteImgCloudinary(req.user.image);
      }

      //----TEST RUNTIME ----//
      //Buscamos usuario actualizado y las keys en el body
      const updateUser = await User.findById(req.user._id);
      const updateKeys = Object.keys(req.body);
      //Variable para guardar el login
      const testUpdate = [];
      //Recorremos keys y comparamos
      updateKeys.forEach((item) => {
        if (updateUser[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      //Actualizamos img
      if (req.file) {
        updateUser.image == req.file.path
          ? testUpdate.push({
              file: true,
            })
          : testUpdate.push({
              file: false,
            });
      }
      return res.status(200).json({
        testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(
      setError(500 || error.code, error.message || 'General error update user')
    );
  }
};

//--------- DELETE USER ---------//
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    if (await User.findById(id)) {
      return res.status(404).json('Dont delete user');
    } else {
      await Appointment.updateMany(
        { services: id },
        { $pull: { services: id } }
      );
      return res.status(200).json('Ok delete user');
    }
  } catch (error) {
    return next(
      setError(500 || error.code, error.message || 'General error delete user')
    );
  }
};

//--------- GET ALL USER ---------//
const getAll = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json('Failed get all Users');
    }
  } catch (error) {
    return next(
      setError(500 || error.code, error.message || 'General error get all user')
    );
  }
};

//--------- GET BY ID USER ---------//
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);
    if (userById) {
      res.status(200).json(userById);
    } else {
      res.status(404).json('Failed get user by Id');
    }
  } catch (error) {
    return next(
      setError(
        500 || error.code,
        error.message || 'General error get by id user'
      )
    );
  }
};

module.exports = {
  register,
  validatedUser,
  resendCode,
  login,
  forgotPassword,
  sendPassword,
  changePassword,
  update,
  deleteUser,
  getAll,
  getById,
};
