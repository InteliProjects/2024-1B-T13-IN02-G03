/**
 * User.js
 *
 * @description :: Model para gerenciar a entidade User
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { tableName } = require("./Handbook");

module.exports = {

tableName: 'Users',

  attributes: {
    // Nome do usuário
    name: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 60
    },
    // Email do usuário
    email: {
      type: 'string',
      required: true,
      unique: true,      
      isEmail: true,
      maxLength: 50
    },
    // Senha do usuário
    password: {
      type: 'string',
      required: true,
      maxLength: 30,
      unique: true
    },
    // CPF do usuário
    cpf: {
      type: 'string',
      maxLength: 11,
      required: true,
      unique: true
    },
    // Data de nascimento do usuário
    birth: {
      type: 'ref',
      columnType: 'date',
      required: true
    },
    // Função ou cargo do usuário
    role: {
      type: 'string',
      maxLength: 30,
      required: true
    },
    // Foto do usuário (Não implementado)
    photo_user: {
      type: 'string',
      isURL: true,
      required: false
    }
  }
};

