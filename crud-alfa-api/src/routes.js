const routes = require('express').Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const {
  options, insertBodyValidatorEstado, queryValidatorEstado, paramValidatorEstado,
  updateBodyValidatorEstado,
} = require('./app/validationSchemas/estadoValidatorSchema');
const {
  insertBodyValidatorCidade, queryValidatorCidade, paramValidatorCidade, updateBodyValidatorCidade,
} = require('./app/validationSchemas/cidadeValidatorSchema');

/*
const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});
*/

const EstadoController = require('./app/controllers/EstadoController');
const CidadeController = require('./app/controllers/CidadeController');

routes.post('/estados', validator.body(insertBodyValidatorEstado, options), EstadoController.insert);
routes.get('/estados', validator.query(queryValidatorEstado, options), EstadoController.find);
routes.get('/estados/:_id', validator.params(paramValidatorEstado, options), EstadoController.findById);
routes.delete('/estados/:_id', validator.params(paramValidatorEstado, options), EstadoController.deleteById);
routes.put('/estados/:_id', validator.body(updateBodyValidatorEstado, options), validator.params(paramValidatorEstado, options), EstadoController.updateOne);

routes.post('/cidades', validator.body(insertBodyValidatorCidade, options), CidadeController.insert);
routes.get('/cidades', validator.query(queryValidatorCidade, options), CidadeController.find);
routes.get('/cidades/:_id', validator.params(paramValidatorCidade, options), CidadeController.findById);
routes.delete('/cidades/:_id', validator.params(paramValidatorCidade, options), CidadeController.deleteById);
routes.put('/cidades/:_id', validator.body(updateBodyValidatorCidade, options), validator.params(paramValidatorCidade, options), CidadeController.updateOne);

module.exports = routes;
