const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
      unique: true,
    },
    password: {
      type: String,
      validate: [validator.isStrongPassword, 'Password not valid'],
      minlength: [8, 'Min 8 characters'],
      required: true,
    },
    rol: {
      type: String,
      enum: ['superAdmin', 'admin', 'basic'],
      default: 'basic',
    },
    image: { type: String },
    confirmationCode: { type: Number, required: true },
    validated: { type: Boolean, default: false },
    journeyStart: { type: Date },
    journeyTime: { type: Number },
    appontments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  },
  {
    timestamps: true,
  }
);

//Presave guardando contraseña
UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next('Error hashing password', error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
