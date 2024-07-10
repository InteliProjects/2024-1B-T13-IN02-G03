/**
 * Handbook.js
 *
 * @description :: Model para gerenciar a entidade Handbook
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Handbooks',
  // Definição dos Atributos
  attributes: {
    // Título do manual
    title: {
      type: 'string',
      required: true,
      maxLength: 60
    },
    // Descrição do manual
    description: {
      type: 'string',
      required: true
    },
    // Versão do manual
    version:{
      type: 'string',
      required: true
    },
    // Relação N:1 com Products
    id_products:{
      model: 'product',
      required: true
    }
  }
};