/**
 * Product.js
 *
 * @description :: Model para gerenciar a entidade Product
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Products',

  attributes: {
    // Nome do produto
    name:{
      type: 'string',
      maxLength: 50,
      required: true
    },
    // Tipo do produto
    type:{
      type:'string',
      maxLength: 30,
      required: true
    },
    // Modelo do produto
    model:{
      type:'string',
      maxLength: 40,
      required: true
    },
  },
};

