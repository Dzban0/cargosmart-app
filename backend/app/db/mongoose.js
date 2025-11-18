const mongoose = require('mongoose');
const { database } = require('../config');


mongoose.connect("mongodb://127.0.0.1:27017/CargoSmartDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(database)
  .then(() => {
    console.log('Połączono z MongoDB');
  })
  .catch((error) => {
    console.error('Błąd połączenia z MongoDB:', error);
  });

module.exports = mongoose;