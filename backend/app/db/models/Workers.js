const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { 
    type: String,
    enum: ["Magazynier", "Spedytor", "Kierowca"],
    required: true 
  }
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;