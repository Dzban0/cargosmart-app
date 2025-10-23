const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Połączono z MongoDB'))
.catch((err) => console.log('Błąd połączenia z MongoDB:', err));

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;