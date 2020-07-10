const autoIncrement = require('mongoose-auto-increment');
const { mongoose } = require('../../database/index');

autoIncrement.initialize(mongoose.connection);

const Schema = mongoose;

const CidadeSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  nome: {
    type: String,
    require: true,
  },
  estadoId: { type: Schema.Types.ObjectId, ref: 'Estado' },
  dataCriacao: {
    type: Date,
    require: true,
  },
  dataUltimaAlteracao: {
    type: Date,
    require: true,
  },
});

CidadeSchema.plugin(autoIncrement.plugin, { model: 'Cidade', field: 'id', startAt: 1 });

const CidadeModel = mongoose.model('Cidade', CidadeSchema);

module.exports = { CidadeModel, CidadeSchema };
