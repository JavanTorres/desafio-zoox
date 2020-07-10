const momentTime = require('moment-timezone');
const { CidadeModel } = require('../models/cidade');
const { EstadoModel } = require('../models/estado');
const { checkConnection } = require('../../database/index');

const trataResultadoCidade = (arr) => arr.map((obj) => ({
  _id: obj._id, id: obj.id, nome: obj.nome, estadoId: obj.estadoId, dataCriacao: momentTime.tz(obj.dataCriacao, 'America/Sao_Paulo').format(), dataUltimaAlteracao: momentTime.tz(obj.dataUltimaAlteracao, 'America/Sao_Paulo').format(),
}));

const insert = async (req, res) => {
  try {
    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });

    const estado = await EstadoModel.find({ _id: req.body.estadoId });
    if (estado.length === 0) return res.status(400).send({ error: 'Nenhum estado encontrado com o estadoId informado.' });

    req.body.dataCriacao = Date.now();
    req.body.dataUltimaAlteracao = Date.now();

    await CidadeModel.countDocuments({ }, (err, count) => {
      if (count === 0) {
        CidadeModel.resetCount((err, nextCount) => {
        });
      }
    });

    const resul = await CidadeModel.create(req.body);
    const result = trataResultadoCidade([resul])[0];
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao inserir novo cidade.' });
  }
};

const find = async (req, res) => {
  try {
    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });

    const { nome } = req.query;
    const obj = {};
    // like 'texto%'.
    if (nome) obj.nome = { $regex: `${nome}.*` };
    // Busca "like '%texto%'": { nome: { $regex: `.*${nome}.*` }.

    const resul = await CidadeModel.find(obj);
    const cidades = trataResultadoCidade(resul);
    return res.send({ cidades });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao inserir novo cidade.' });
  }
};

const findById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });

    const doc = await CidadeModel.find({ _id });
    if (doc.length === 0) return res.status(400).send({ error: 'Cidade não encontrada.' });
    const result = trataResultadoCidade(doc)[0];

    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao buscar uma cidade.' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });
    const doc = await CidadeModel.find({ _id });
    if (doc.length === 0) return res.status(400).send({ error: 'Cidade não encontrada.' });

    const result = await CidadeModel.deleteOne({ _id });
    return res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao deletar cidade.' });
  }
};

const updateOne = async (req, res) => {
  try {
    const {
      nome, estadoId,
    } = req.body;
    const { _id } = req.params;

    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });
    const doc = await CidadeModel.find({ _id });
    if (doc.length === 0) return res.status(400).send({ error: 'Cidade não encontrada.' });

    const obj = {
      nome, estadoId, dataUltimaAlteracao: Date.now(),
    };

    const now = new Date();
    console.log('\nData em UTC:\n', now, '\nOffset da Data Local:\n', now.getTimezoneOffset(),
      '\nConverter para dala local Usando Offset:\n', new Date(now - (now.getTimezoneOffset() * 60000)));

    // { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}
    const resul = await CidadeModel.findOneAndUpdate({ _id }, { $set: obj }, { new: true });
    const result = trataResultadoCidade([resul]);
    return res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao atualizar cidade.' });
  }
};

module.exports = {
  insert, find, findById, deleteById, updateOne,
};
