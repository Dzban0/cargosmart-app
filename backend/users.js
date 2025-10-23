const User = require("./userModel");

const users = [
  { login: "kdowbor", password: "admin111", firstName: "Kacper", lastName: "Dowbor", role: "admin" },
  { login: "ekowalska", password: "ewcia111", firstName: "Ewa", lastName: "Kowalska", role: "magazynier" },
  { login: "pnowak", password: "luty111", firstName: "Piotr", lastName: "Nowak", role: "spedytor" },
  { login: "mmusial", password: "kier111", firstName: "Marian", lastName: "Musiał", role: "kierowca" },
];

async function addUsers() {
  try {
    for (let userData of users) {
      const user = new User(userData);
      await user.save();
    }
    console.log('Użytkownicy zostali dodani do bazy!');
  } catch (err) {
    console.error('Błąd podczas dodawania użytkowników:', err);
  }
}

addUsers();
