const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    default: null,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    default: null,
  },
  status: {
    type: String,
    enum: ["planowany", "w trakcie", "zakończony"],
    default: "planowany",
  },
  description: String,
});

module.exports = mongoose.model("Transport", transportSchema);