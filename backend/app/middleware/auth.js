const jwt = require("jsonwebtoken");
const JWT_SECRET = "super_secret_key";

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Brak tokenu" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Nieprawidłowy token" });
  }
};