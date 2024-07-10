/**
 * Feedback.js
 *
 * @description :: Model para gerenciar a entidade Feedback
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Feedback',

  attributes: {
    // Mensagem do feedback
    mensagem: {
      type: 'string',
      required: true,
    },
    // Relação N:1 com User
    id_users: {
      model: 'user',
      required: true,
    },
    // Relação opcional N:1 com Handbook
    id_handbooks: {
      model: 'handbook',
      required: true,
    }
  }
};
