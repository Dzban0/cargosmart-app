const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "super_secret_key";

router.post("/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    const exist = await User.findOne({ login });
    if (exist) return res.status(400).json({ message: "Login już istnieje" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ login, password: hashed });
    await user.save();

    res.json({ message: "Utworzono konto" });
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera" });
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: "Nieprawidłowy login" });

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) return res.status(400).json({ message: "Złe hasło" });

    const token = jwt.sign(
      { id: user._id, login: user.login },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera" });
  }
});

module.exports = router;
