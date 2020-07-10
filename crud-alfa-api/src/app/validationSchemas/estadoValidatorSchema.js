const Joi = require('@hapi/joi');

/* ============================================================================================================================== */

/*
  Para Joi.date() pesquisar sobre a função raw().
  Um exemplo de como criar uma mensagem customizadas para Joi.number():
  .messages({
    'number.base': "Formato inválido, o atributo '{#label}' deve ser um número.",
  });
*/
// const defaultDate = Joi.date().required().iso().raw();
// const defaultNumber = Joi.number();
// const defaultInteger = defaultNumber.integer();
const defaultString = Joi.string();
// const defaultObject = Joi.object().required();

/* ============================================================================================================================== */

/*
    O 'convert' é de  extrema importância, se não informado ele será 'true', se ele estiver false as validações de datas que chegam como uma string irão falhar.
    O 'allowUnknown' tem como objetivo permitir campos que não foram especificados na requisição. Sem ele qualquer
    campo não descrito em 'keys' fará que a requisição seja rejeitada.
    O 'abortEarly'tem como objetivo dizer se a execução deve parar no primeiro erro ou não.
*/
const options = { joi: { convert: true, allowUnknown: false, abortEarly: false } };

const insertBodyValidatorEstado = Joi.object().keys({
  nome: defaultString.required(),
  abreviacao: defaultString.required(),
});

const updateBodyValidatorEstado = Joi.object().keys({
  nome: defaultString.required(),
  abreviacao: defaultString.required(),
});

const queryValidatorEstado = Joi.object().keys({
  nome: defaultString,
  abreviacao: defaultString,
});

const paramValidatorEstado = Joi.object().keys({
  _id: defaultString.hex().min(24).required(),
});

module.exports = {
  options,
  insertBodyValidatorEstado,
  queryValidatorEstado,
  paramValidatorEstado,
  updateBodyValidatorEstado,
};
