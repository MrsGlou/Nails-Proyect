const mongoose = require('mongoose');
const validator = require('validator');
const validatorPhone = require('google-libphonenumber');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
    },
    phone: {
      type: String,
      required: true,
      validate: [validatorPhone.isValidNumber, 'Phone not valid'],
    },
    appointmentStart: { type: Date, required: true },
    appointmentEnd: { type: Date, required: true },
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
