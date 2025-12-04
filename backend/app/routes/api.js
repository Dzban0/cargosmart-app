const express = require("express");
const router = express.Router();
const User = require("../db/models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "supersecretkey";

router.post("/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname: "John",
      lastName: "Doe",
      login,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User registered" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "User already exists" });
  }
});

// ---- LOGOWANIE ----
router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;