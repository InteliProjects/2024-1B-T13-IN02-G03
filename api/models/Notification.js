/**
 * Notification.js
 *
 * @description :: Model para gerenciar a entidade Notification
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Notifications',

  attributes: {
    // Nome da notificação
    name: {
      type: 'string',
      maxLength: 50,
      required: true
    },
    // Descrição da notificação
    description: {
      type: 'string',
      maxLength: 500,
      required: true
    },
    // Indica se a notificação foi lida
    read: {
      type: 'boolean',
      defaultsTo: false
    },
    // Referência ao modelo Handbook
    id_handbook: {
      model: 'handbook',
      required: true
    },
    // Referência ao modelo User
    id_users: {
      model: 'user',
      required: true
    },
  },
};

