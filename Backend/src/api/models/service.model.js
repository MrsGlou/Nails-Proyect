const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    //Tiempo que dura el servicio, esto se suma en la fecha y sacamos la fecha fin, para ver la duración de la cita.
    time: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
