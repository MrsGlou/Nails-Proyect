const mongoose = require('mongoose');
const validator = require('validator');
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
    },
    validated: { type: Boolean, default: false },
    state: {
      type: String,
      enum: ['pending', 'verify', 'closed'],
      default: 'pending',
    },
    day: { type: Date, required: true },
    appointmentStart: { type: String, required: true },
    appointmentEnd: { type: String },
    totalTime: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
