const momentTime = require('moment-timezone');
const { EstadoModel } = require('../models/estado');
const { checkConnection } = require('../../database/index');

const trataResultadoEstado = (arr) => arr.map((obj) => ({
  _id: obj._id, id: obj.id, nome: obj.nome, abreviacao: obj.abreviacao, dataCriacao: momentTime.tz(obj.dataCriacao, 'America/Sao_Paulo').format(), dataUltimaAlteracao: momentTime.tz(obj.dataUltimaAlteracao, 'America/Sao_Paulo').format(),
}));

const insert = async (req, res) => {
  try {
    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });

    req.body.dataCriacao = Date.now();
    req.body.dataUltimaAlteracao = Date.now();

    await EstadoModel.countDocuments({ }, (err, count) => {
      if (count === 0) {
        EstadoModel.resetCount((err, nextCount) => {
        });
      }
    });

    const resul = await EstadoModel.create(req.body);
    const estado = trataResultadoEstado([resul])[0];
    return res.send(estado);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao inserir novo estado.' });
  }
};

const find = async (req, res) => {
  try {
    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });

    const { nome, abreviacao } = req.query;
    const obj = {};
    // like 'texto%'.
    if (nome) obj.nome = { $regex: `${nome}.*` };
    if (abreviacao) obj.abreviacao = { $regex: `${abreviacao}.*` };
    // Busca "like '%texto%'": { nome: { $regex: `.*${nome}.*` }.

    const resul = await EstadoModel.find(obj);
    const estados = trataResultadoEstado(resul);
    return res.send({ estados });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao inserir novo estado.' });
  }
};

const findById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });

    const doc = await EstadoModel.find({ _id });
    if (doc.length === 0) return res.status(400).send({ error: 'Estado não encontrado.' });
    const result = trataResultadoEstado(doc)[0];

    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao buscar um estado.' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });
    const doc = await EstadoModel.find({ _id });
    if (doc.length === 0) return res.status(400).send({ error: 'Estado não encontrado.' });

    const result = await EstadoModel.deleteOne({ _id });
    return res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao deletar estado.' });
  }
};

const updateOne = async (req, res) => {
  try {
    const {
      nome, abreviacao,
    } = req.body;
    const { _id } = req.params;

    if (!checkConnection()) return res.status(400).send({ error: 'Banco de dados sem conexão.' });
    const doc = await EstadoModel.find({ _id });
    if (doc.length === 0) return res.status(400).send({ error: 'Estado não encontrado.' });

    const obj = {
      nome, abreviacao, dataUltimaAlteracao: Date.now(),
    };

    // { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}
    const resul = await EstadoModel.findOneAndUpdate({ _id }, { $set: obj }, { new: true });
    const result = trataResultadoEstado([resul]);
    return res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Erro ao atualizar estado.' });
  }
};

module.exports = {
  insert, find, findById, deleteById, updateOne,
};
