const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: {type: String, required: true },
  description: { type: String, required: true },
});

const Transport = mongoose.model("Transport", transportSchema);

module.exports = Transport;