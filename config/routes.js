/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  // View inicial
  '/': { view: 'pages/homepage' },

  // View de membro
  '/user': {
    view: 'pages/user',
    // policy: 'isAuthenticated'
  },

  // View de administrador
  '/admin': {
    view: 'pages/admin',
    // policy: 'isAuthenticated'
  },
  
  // View de gráficos
  '/dashboard': {
    view: 'pages/dashboard',
    // policy: 'isAuthenticated'
  },

  // Rotas: AUTH
  'POST /login': 'AuthController.login',

  // Rotas: USERS

  // 'POST /register': 'AuthController.register', // Registra um usuário (Não implementada)
  // 'POST /users/login': 'UsersController.login', // Realiza o login (Movida para AuthController)
  'GET /users': 'UsersController.find', // Retorna uma lista de todos os usuários
  'GET /users/:id': 'UsersController.findOne', // Retorna os detalhes de um usuário específico
  'POST /users': 'UsersController.create', // Cria um novo usuário
  'PUT /users/:id': 'UsersController.update', // Atualiza as informações de um usuário existente
  'DELETE /users/:id': 'UsersController.destroy', // Remove um usuário
  'GET /users/findNum': 'UsersController.findNumOfUsers',

  // Rotas: HANDBOOK
  'GET /handbook/read/:id_handbooks/:id_users' : 'HandbooksController.updateRead',
  'GET /handbook/:id/materials': 'HandbooksController.findMaterialsByManualId',
  'GET /handbook': 'HandbooksController.find', // Obter uma lista de todos os manuais
  'GET /handbook/:id': 'HandbooksController.findOne', // Obter os detalhes de um manual
  'POST /handbook': 'HandbookController.create', // Criar um novo manual
  'PUT /handbook/:id': 'HandbooksController.update', // Atualizar o status de um manual existente
  'DELETE /handbook/:id': 'HandbooksController.destroy', // Remover um manual existente
  
  // Rota: MATERIALS
  'GET /material/:id': 'MaterialsController.findOne', // Obter os detalhes de todos os tipos de arquivos 
  'POST /material': 'MaterialsController.create', // Criar todos os tipos de arquivos de manuais
  // Não implementadas:
  // 'GET /material': 'MaterialsController.find', // Obter uma lista de todos os tipos de arquivos de manuais
  // 'PUT /material/:id': 'MaterialsController.update', // Atualizar o status de todos os tipos de arquivos de  manual existente
  // 'DELETE /material/:id': 'MaterialsController.destroy', // Remover todos os tipos de arquivos de manuais 

  // Rotas: PRODUCTS
  'GET /product': 'ProductsController.find', // Obter uma lista de todos os manuais
  'GET /product/:id': 'ProductsController.findOne', // Obter os detalhes de um manual
  'POST /product': 'ProductsController.create', // Criar um novo manual
  'PUT /product/:id': 'ProductsController.update', // Atualizar o status de um manual existente
  'DELETE /product/:id': 'ProductsController.destroy', // Remover um manual existente

  // Rotas: GROUPS
  'GET  /group/:assembly_line/linhas' : 'GroupsController.findUserByAssemblyLine',
  'GET  /group/linhas2' : 'GroupsController.findUserByAssemblyLine2',
  'GET /group': 'GroupsController.find', // Obter uma lista de todos as linhas de montagens
  'POST /group': 'GroupsController.create', // Criar uma linha de montagem
  'GET /group/:id': 'GroupsController.findOne', // Visualizar uma linha de montagem específica
  'PUT /group/:id': 'GroupsController.update', // Atualizar linha de montagem existente
  'DELETE /group/:id': 'GroupsController.destroy', // Remover uma linha de montagem
  'GET /group/:assembly_line/graph': 'GroupsController.graphByLine',

  // Rotas: TASK
  'GET /task': 'TasksController.find', // Obter uma lista de todas as tarefas
  'POST /task': 'TasksController.create', // Criar uma tarefa
  'GET /task/:id': 'TasksController.findOne', // Visualizar uma tarefa específica
  'PUT /task/:id': 'TasksController.update', // Atualizar tarefa existente
  'DELETE /task/:id': 'TasksController.destroy', // Remover uma tarefa
  'GET /users/:userId/UndoneTasks': 'TasksController.findUndoneTask', // Obter uma lista de tarefas designadas para o usuário e não lidas ainda
  'GET /users/:userId/DoneTasks': 'TasksController.findDoneTask', // Obter uma lista de tarefas designadas para o usuário e já feitas 
  'GET /task/:idManuais/FilterImagem': 'TasksController.filterImagem',
  'GET /task/findNumber' : 'TasksController.findNumberOfTasks' ,
  'GET /task/findGroup' : 'TasksController.findTaskByAssemblyLine',
  'GET /task/findByGroup' : 'TasksController.findCompletedTasksByAssemblyLine',
  'GET /task/findByHandbook/:id_handbooks' : 'TasksController.findTaskByHandbook'
};
