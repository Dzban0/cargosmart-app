const express = require("express");
const router = express.Router();
const User = require("../db/models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecret";

router.post("/register", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "Brak loginu lub hasła." });
    }

    const existing = await User.findOne({ login });
    if (existing) {
      return res.status(400).json({ message: "Login jest już zajęty." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastName,
      login,
      password: hashedPassword,
    });

    await user.save();

    return res.json({ message: "Utworzono użytkownika." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "Błędne dane logowania." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Błędne dane logowania." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

module.exports = router;