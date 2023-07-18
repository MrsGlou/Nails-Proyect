const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  },
  {
    timestamps: true,
  }
);

const ServiceType = mongoose.model('Service', ServiceTypeSchema);
module.exports = ServiceType;
