const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  registration: { type: String, required: true },
  capacity: { type: Number },
  weight: {type: Number},
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;