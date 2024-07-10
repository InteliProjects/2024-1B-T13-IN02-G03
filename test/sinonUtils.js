const sinon = require("sinon");

const mockAsync = (model, module, result = null) => {
  return sinon.stub(model, module).resolves(result);
};

const RESPONSE = {
  json: function (data) {
    return data;
  },
};

// const RESPONSE = {
//   _statusCode: 200,
//   status: function (code) {
//     this._statusCode = code;
//     return this;
//   },
//   json: function (data) {
//     return {
//     statusCode: this._statusCode,
//     body: data,
//     };
//   },
// };

const USER = {
    name: "Pedro",
    email: "peter@and.com",
    password: "pas123",
    cpf: "12345678300",
    birth: "2006-01-01",
    role: "user",
    photo_user: "http://example.com/photos/johndoe.jpg"
};

const PRODUCT = {
    name: "Notebook Inspiron 15",
    type: "Notebook",
    model: "12ª geração Intel® Core™  i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
  }
  const GROUP = {
    id: 1,
    assembly_line: 1,
    id_users: 1
}

const USERS = ['Pedro', 'Paulo'];

const IDUSERS = [1, 2, 3];

const MATERIAL = {
  file: "caminho/do/arquivo",
  title: "Montagem X",
  type: "PDF",
  id_handbooks: 105
};
const HANDBOOK = {
  id: 1,
  title: 'Novo Manual',
  description: 'Descrição do novo manual',
  version: '1.0',
  id_products: 1
};
const TASK = {
  
    read: false,
    important: true,
    id_users: 41,
    id_handbooks: 106
  
}

module.exports = {
  mockAsync,
  RESPONSE,
  USER,
  PRODUCT,
  GROUP,
  USERS,
  IDUSERS,
  MATERIAL,
  TASK, HANDBOOK
};