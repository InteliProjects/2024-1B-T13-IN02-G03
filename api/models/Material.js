/**
 * Material.js
 *
 * @description :: Model para gerenciar a entidade Material
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Materials',
  attributes: {
    // Nome do arquivo
    file:{
      type: 'string',
      required: true
    },
    // Tipo do arquivo
    type:{
      type: 'string',
      required: true
    },
    // Título do arquivo
    title:{
      type: 'string',
      required: true,
      maxLength: 60
    },
    // Relação N:1 com Handbooks
    id_handbooks: {
      model: 'handbook',
      required: true
    }
  },
};

