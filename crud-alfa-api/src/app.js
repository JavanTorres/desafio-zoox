const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { joiErrorHandler } = require('./app/validationSchemas/errorHandler');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.express.use(joiErrorHandler);
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use('/api', routes);
  }
}

module.exports = new AppController().express;
