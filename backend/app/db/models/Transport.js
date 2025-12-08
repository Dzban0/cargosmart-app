const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: {type: String, required: true },
  vehicle: { type: String },
  driver: { type: String },
  status: { type: String, default: "oczekuje" },
  description: { type: String },
}, { timestamps: true });

const Transport = mongoose.model("Transport", transportSchema);

module.exports = Transport;