/**
 * GroupsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { select } = require("sails-postgresql/helpers");

module.exports = {
  // Obter uma lista de todos as linhas de montagens
  async find(req, res) {
    try {
      const groups = await Group.find();
      return res.json(groups);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Criar uma linha de montagem
  async create(req, res) {
    try {
      const { assembly_line, id_users } = req.body;
      if (!assembly_line || !id_users) {
        return res.status(400).json({ error: 'assembly_line and id_users are required' });
      }
      const newGroup = await Group.create({ assembly_line, id_users }).fetch();
      return res.status(201).json(newGroup);
    } catch (error) {
      return res.serverError(error);
    }
  },
  // Visualizar uma linha de montagem específica
  async findOne(req, res) {
    try {
      const groupId = req.param('id');
      if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
      }
      const group = await Group.findOne({ id: groupId });
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.json(group);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Atualizar linha de montagem existente
  async update(req, res) {
    try {
      const groupId = req.param('id');
      const { assembly_line, id_users } = req.body;
      if (!assembly_line || !id_users) {
        return res.status(400).json({ error: 'assembly_line and id_users are required' });
      }
      const updatedGroup = await Group.updateOne({ id: groupId }).set({ assembly_line, id_users });
      if (!updatedGroup) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.json(updatedGroup);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Remover uma linha de montagem
  async destroy(req, res) {
    try {
      const groupId = req.param('id');
      const deletedGroup = await Group.destroyOne({ id: groupId });
      if (!deletedGroup) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.json({ message: 'Group deleted successfully' });
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Obter IDs de usuários por linha de montagem
  async findUserByAssemblyLine(req, res) {
    const assembly_line = req.param('assembly_line');
    try {
      const groups = await Group.find({ where:{
        assembly_line: assembly_line,
      },
      select:['id_users']
    });
      const userIds = groups.map(group => group.id_users);
      return res.json(userIds);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Obter nomes de usuários por linha de montagem
  async findUserByAssemblyLine2(req, res) {
    try {

//       const groups = await Group.find({ where:{
//         assembly_line: assembly_line,
//       },
//       select:['id_users']
//     });
//       const userIds = groups.map(group => group.id_users);
//       const users = await User.find({ 
//         where:{
//           id:userIds
//         },
//         select: ['name']
//        });
//       const userNames = users.map(user => user.name);
//       return res.json(userNames);

      // Busca todos os grupos
      const groups = await Group.find();
  
      // Cria um objeto para armazenar os IDs de usuários agrupados por assembly_line
      const usersByAssemblyLine = {};
      
      groups.forEach(group => {
        if (!usersByAssemblyLine[group.assembly_line]) {
          usersByAssemblyLine[group.assembly_line] = [];
        }
        usersByAssemblyLine[group.assembly_line].push(group.id_users);
      });
  
      // Recupera todos os IDs de usuários únicos
      const userIds = [...new Set(groups.map(group => group.id_users))];
  
      // Busca usuários pelos IDs
      const users = await User.find({ id: userIds });
  
      // Cria um objeto para armazenar os nomes de usuários agrupados por assembly_line
      const userNamesByAssemblyLine = {};
  
      for (const assemblyLine in usersByAssemblyLine) {
        userNamesByAssemblyLine[assemblyLine] = users
          .filter(user => usersByAssemblyLine[assemblyLine].includes(user.id))
          .map(user => user.name);
      }
  
      return res.json(userNamesByAssemblyLine);

    } catch (error) {
      return res.serverError(error);
    }
  },
  
  async graphByLine(req, res) {
    
    const assembly_line = req.param('assembly_line')
    
    try{

      const users = await Group.find({
        where:{
          assembly_line: assembly_line,
        },
        select:['id_users']
      })

      const idUsers = users.map(user => {
        return user.id_users
      })

      const tasks = await Task.find({
        where:{
          id_users: idUsers,
          read: false
        },
        select:['id_users']
      })

      const names = await User.find({
        where:{
          id: idUsers
        },
        select:['name']
      })

      const countTasksByName = tasks.reduce((acc, task) => {
        const nameObj = names.find(name => name.id === task.id_users);
        if (nameObj) {
          acc[nameObj.name] = (acc[nameObj.name] || 0) + 1;
        }
        return acc;
      }, {});
      
      res.json(countTasksByName)
      } catch (error) {
      return res.serverError(error);
    }
  }
}

