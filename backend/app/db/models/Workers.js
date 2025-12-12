const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  phone: {type: String, default: "" },
  email: {type: String, default: "" },
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;