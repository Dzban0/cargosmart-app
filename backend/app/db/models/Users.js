const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { 
    type: String, 
    required: true, 
    unique: true,
  },
  password: { 
    type: String, 
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;