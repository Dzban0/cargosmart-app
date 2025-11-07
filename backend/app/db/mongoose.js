const mongoose = require('mongoose');
const { database } = require('../config');

mongoose.connect(database)
  .then(() => {
    console.log('Połączono z MongoDB');
  })
  .catch((error) => {
    console.error('Błąd połączenia z MongoDB:', error);
  });

module.exports = mongoose;