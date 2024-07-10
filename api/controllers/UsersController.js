/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { select } = require("sails-postgresql/helpers");

// api/controllers/UserController.js
module.exports = {
  // Método para buscar todos os usuários
  async find(req, res) {
    try {
      // Busca todos os usuários no banco de dados
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro do servidor
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Método para buscar um usuário específico pelo ID
  async findOne(req, res) {
    try {
      // Busca um usuário pelo ID fornecido nos parâmetros da requisição
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        // Se o usuário não for encontrado, retorna um erro 404 (not found)
        return res.status(404).json({ error: 'User not found' });
      }
      // Retorna o usuário como um JSON
      return res.json(user);
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro do servidor
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Método para criar um novo usuário
  async create(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Cria um novo usuário com os dados fornecidos no corpo da requisição
      const newUser = await User.create(req.body).fetch();
      // Retorna o usuário criado com um status 201 (created)
      return res.status(201).json(newUser);
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro do servidor
      console.error("Error creating user:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Método para atualizar um usuário existente pelo ID
  async update(req, res) {
    try {
      // Atualiza o usuário com os dados fornecidos no corpo da requisição
      const updatedUser = await User.updateOne({ id: req.params.id }).set(req.body);
      if (!updatedUser) {
        // Se o usuário não for encontrado, retorna um erro 404 (not found)
        return res.status(404).json({ error: 'User not found' });
      }
      // Retorna o usuário atualizado como um JSON
      return res.json(updatedUser);
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro do servidor
      console.error("Error updating user:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Método para deletar um usuário pelo ID
  async destroy(req, res) {
    try {
      // Deleta o usuário pelo ID fornecido
      const deletedUser = await User.destroyOne({ id: req.params.id });
      if (!deletedUser) {
        // Se o usuário não for encontrado, retorna um erro 404 (not found)
        return res.status(404).json({ error: 'User not found' });
      }
      // Retorna uma mensagem de sucesso
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro do servidor
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Método para buscar todos os usuários
  async findNumOfUsers(req, res) {
    try {
      // Busca todos os usuários no banco de dados
      const users = await User.find({
        where: {
          role: 'membro'
        },
        select: ['id']
      });

      const quantidade = users.length 
      return res.json(quantidade);
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro do servidor
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

};
