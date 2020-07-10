const mongoose = require('mongoose');
const config = require('../../config.json');

mongoose.connect(config.urlConexaoMongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log('MongoDB error Connect:', err));

mongoose.Promise = global.Promise;

const checkConnection = () => mongoose.connection.readyState;

module.exports = { mongoose, checkConnection };
