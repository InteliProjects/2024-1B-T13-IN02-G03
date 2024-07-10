/**
 * Task.js
 *
 * @description :: Model para gerenciar a entidade Task
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Tasks',

  attributes: {
    // Indicação de manual lido
    read: {
      type: 'boolean',
      defaultsTo: false
    },
    // Indicação de manual com prioridade
    important: {
      type: 'boolean',
      defaultsTo: false
    },
    // Relações N:1 com users
    id_users: {
      model: 'user',
      required: true
    },
    // Relações N:1 com handbooks
    id_handbooks: {
      model: 'handbook',
      required: true
    }
  }
};
