const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema(
  {
    description: { type: String, required: true },
    appointment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model('Calendar', CalendarSchema);
module.exports = Calendar;
