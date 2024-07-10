/**
 * Group.js
 *
 * @description :: Model para gerenciar a entidade Group
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Groups',

  attributes: {
    // Número da linha de montagem do grupo.
    assembly_line:{
      type: 'number',
      required: true
    },
    // ID do usuário associado ao grupo.
    id_users:{
      model: 'user',
      required: true,
    }
  }
};


