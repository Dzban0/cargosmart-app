const User = require('./app/db/models/Users');
const bcrypt = require('bcryptjs');

async function createDefaultUser() {
  const exists = await User.findOne({ login: "admin" });
  if (!exists) {
    const password = await bcrypt.hash("admin111", 10);
    await User.create({
      firstname: "Admin",
      lastName: "User",
      login: "admin",
      password,
    });
    console.log("Dodano użytkownika admin z hasłem");
  }
}

createDefaultUser();