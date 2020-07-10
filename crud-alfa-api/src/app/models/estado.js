const autoIncrement = require('mongoose-auto-increment');
const { mongoose } = require('../../database/index');

autoIncrement.initialize(mongoose.connection);

const EstadoSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  nome: {
    type: String,
    require: true,
  },
  abreviacao: {
    type: String,
    require: true,
  },
  dataCriacao: {
    type: Date,
    require: true,
  },
  dataUltimaAlteracao: {
    type: Date,
    require: true,
  },
});

EstadoSchema.plugin(autoIncrement.plugin, { model: 'Estado', field: 'id', startAt: 1 });
/*
O Nome da collection será 'estados', mas se colocar no singular ele vai criar no plural e minúsculo.
 */

const EstadoModel = mongoose.model('Estado', EstadoSchema);

module.exports = { EstadoModel, EstadoSchema };
