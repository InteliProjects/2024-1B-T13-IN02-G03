/**
 * TaskController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @docs        :: https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Obter uma lista de todas as tarefas
  async find(req, res) {
    try {
      const tasks = await Task.find();
      return res.json(tasks);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Criar uma nova tarefa
  async create(req, res) {
    try {
      const { read, important, id_users, id_handbooks } = req.body;

      if (typeof read !== 'boolean' || typeof important !== 'boolean' || !id_users || !id_handbooks) {
        return res.status(400).json({ error: 'Invalid input data' });
      }

      const newTask = await Task.create({ read, important, id_users, id_handbooks }).fetch();
      return res.status(201).json(newTask);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Visualizar uma tarefa específica
  async findOne(req, res) {
    try {
      const taskId = req.param('id');
      if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required' });
      }

      const task = await Task.findOne({ id: taskId });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.json(task);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Atualizar uma tarefa existente
  async update(req, res) {
    try {
      const taskId = req.param('id');
      const { read, important, id_users, id_handbooks } = req.body;

      if (typeof read !== 'boolean' || typeof important !== 'boolean' || !id_users || !id_handbooks) {
        return res.status(400).json({ error: 'Invalid input data' });
      }

      const updatedTask = await Task.updateOne({ id: taskId }).set({ read, important, id_users, id_handbooks });
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.json(updatedTask);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Remover uma tarefa existente
  async destroy(req, res) {
    try {
      const taskId = req.param('id');
      const deletedTask = await Task.destroyOne({ id: taskId });

      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.json(deletedTask);
    } catch (error) {
      return res.serverError(error);
    }
  },

      // Buscar um manual designado e não lido a um usuário atravéz de seu Id, passando pela tabela Task
      async findUndoneTask(req, res) {
        // Extrai o ID do usuário dos parâmetros da requisição
        const userId = parseInt(req.param('userId'), 10);
      
        try {
            // Busca todas as tarefas associadas ao usuário
            const userTask = await Task.find({ 
              where: {
                id_users: userId,
                read: false
              },
              select: ['id_handbooks']
             });
            // Verifica se não há tarefas para o usuário
            if (!userTask || userTask.length === 0) {
                return res.notFound({ error: "No tasks for this User" });
            }
      
            // Extrai os IDs dos manuais associados às tarefas do usuário que não forma concluídos
            const handbookIds = userTask.map(function(userTask) {
                return userTask.id_handbooks;
            });
            // Verifica se não há IDs de manuais associados às tarefas concluídas
            if (!handbookIds || handbookIds.length === 0) {
                return res.notFound({ error: "No Handbooks for this Task" });
            }
      
            // Busca os manuais com os IDs encontrados
            const handbooks = await Handbook.find({ 
              where: {
                id: handbookIds
              },
              select: ['version', 'title']
             });
      
            // Verifica se não há manuais encontrados com os IDs especificados
            if (!handbooks || handbooks.length === 0) {
                return res.notFound({ error: "No handbooks with this Id" });
            }
      
            // Retorna os manuais encontrados em formato JSON
           
            return res.json(handbooks);
        } catch (error) {
            // Retorna um erro 500 caso ocorra um erro durante a execução da função
            console.error('Error:', error);
            return res.serverError(error);
        }
      },
    // Buscar um manual designado e lido a um usuário atravéz de seu Id, passando pela tabela Task
    async findDoneTask(req, res) {
      // Extrai o ID do usuário dos parâmetros da requisição
      const userId = parseInt(req.param('userId'), 10);
    
      try {
        // Busca todas as tarefas associadas ao usuário
        const userTask = await Task.find({ 
          where: {
            id_users: userId,
            read: true
          },
          select: ['id_handbooks']
         });
        // Verifica se não há tarefas para o usuário
        if (!userTask || userTask.length === 0) {
            return res.notFound({ error: "No tasks for this User" });
        }
  
        // Extrai os IDs dos manuais associados às tarefas do usuário que não forma concluídos
        const handbookIds = userTask.map(function(userTask) {
            return userTask.id_handbooks;
        });
        // Verifica se não há IDs de manuais associados às tarefas concluídas
        if (!handbookIds || handbookIds.length === 0) {
            return res.notFound({ error: "No Handbooks for this Task" });
        }
  
        // Busca os manuais com os IDs encontrados
        const handbooks = await Handbook.find({ 
          where: {
            id: handbookIds
          },
          select: ['version', 'title']
         });
  
        // Verifica se não há manuais encontrados com os IDs especificados
        if (!handbooks || handbooks.length === 0) {
            return res.notFound({ error: "No handbooks with this Id" });
        }
  
        // Retorna os manuais encontrados em formato JSON
       
        return res.json(handbooks);
      } catch (error) {
          // Retorna um erro 500 caso ocorra um erro durante a execução da função
          console.error('Error:', error);
          return res.serverError(error);
      }
    },

    async filterImagem(req, res) {
      const idsHandbooks = req.param('idManuais');
      console.log('IDs dos Manuais:', idsHandbooks); // Debug: Verifica os IDs recebidos na requisição
    
      try {
        const materials = await Material.find({ id_handbooks: idsHandbooks });
        console.log('Materiais encontrados:', materials); // Debug: Confirma os dados recebidos de Materials
    
        const idsVerificado = materials.map(function(material) {
          if (material.type === 'Imagem') {
            return material.id_handbooks;
          }
        }).filter(id => id !== undefined); // Adiciona filtro para remover undefined do array
    
        console.log('IDs verificados (apenas imagens):', idsVerificado); // Debug: Lista IDs filtrados
    
        const HandbookVerificado = await Handbook.find({ id: idsVerificado });
        console.log('Handbooks Verificados:', HandbookVerificado); // Debug: Mostra os Handbooks correspondentes
    
        return res.json(HandbookVerificado);
      } catch (error) {
        console.error('Error:', error); // Debug: Captura e exibe qualquer erro que ocorra
        return res.serverError(error);
      }
    },

    async findNumberOfTasks(req, res){
      try{
        const task = await Task.find({
          select: ['read']
        });
        // Inicializa contadores para tarefas lidas e não lidas
        let readTrue = 0;
        let readFalse = 0;

        // Itera sobre cada tarefa para contar as lidas e não lidas
        task.forEach(task => {
          if (task.read) {
            readTrue += 1;  // Incrementa o contador para tarefas lidas
          } else {
            readFalse += 1; // Incrementa o contador para tarefas não lidas
          }
        });
        // Retorna os contadores em formato JSON
        return res.json({ readTrue, readFalse });
      } catch (error) {
        console.error('Error:', error); // Debug: Captura e exibe qualquer erro que ocorra
        return res.serverError(error);
      }   
    },
    async findTaskByAssemblyLine(req, res) {
      try {
        let lines = {};
    
        // Busca tarefas que tenham sido marcadas como lidas
        const tasks = await Task.find({
          where: {
            read: false
          },
          select: ['id', 'id_users']  // Inclui id da tarefa e id_users
        });
    
        // Se não houver tarefas, encerra cedo
        if (!tasks.length) {
          return res.json({ lines: {} });
        }
    
        // Extrai os IDs de usuários das tarefas para usar na próxima consulta
        const userIDs = tasks.map(task => task.id_users);
    
        // Busca grupos que contenham os usuários especificados
        const groups = await Group.find({
          where: {
            id_users: userIDs
          },
          select: ['assembly_line', 'id_users']
        });
    
        // Mapeia os grupos para encontrar a correspondência de linhas
        groups.forEach(group => {
          const lineName = group.assembly_line;
          if (!lines[lineName]) {
            lines[lineName] = [];
          }
          // Adiciona o ID da tarefa ao array da linha correspondente, se o usuário estiver associado a essa tarefa
          tasks.forEach(task => {
            if (task.id_users === group.id_users) {
              lines[lineName].push(task.id);  // Adiciona o id da tarefa ao array da linha correspondente
            }
          });
        });
    
        // Retorna as linhas agrupadas com os IDs das tarefas
        res.json({ lines });
      } catch (error) {
        console.error('Error:', error);
        res.serverError(error);
      }
    },
    async findCompletedTasksByAssemblyLine(req, res) {
      try {
        let lines = {};
    
        // Busca tarefas que tenham sido marcadas como lidas
        const tasks = await Task.find({
          where: {
            read: true
          },
          select: ['id', 'id_users']  // Inclui id da tarefa e id_users
        });
    
        // Se não houver tarefas, encerra cedo
        if (!tasks.length) {
          return res.json({ lines: {} });
        }
    
        // Extrai os IDs de usuários das tarefas para usar na próxima consulta
        const userIDs = tasks.map(task => task.id_users);
    
        // Busca grupos que contenham os usuários especificados
        const groups = await Group.find({
          where: {
            id_users: userIDs
          },
          select: ['assembly_line', 'id_users']
        });
    
        // Mapeia os grupos para encontrar a correspondência de linhas
        groups.forEach(group => {
          const lineName = group.assembly_line;
          if (!lines[lineName]) {
            lines[lineName] = [];
          }
          // Adiciona o ID da tarefa ao array da linha correspondente, se o usuário estiver associado a essa tarefa
          tasks.forEach(task => {
            if (task.id_users === group.id_users) {
              lines[lineName].push(task.id);  // Adiciona o id da tarefa ao array da linha correspondente
            }
          });
        });
    
        // Retorna as linhas agrupadas com os IDs das tarefas
        res.json({ lines });
      } catch (error) {
        console.error('Error:', error);
        res.serverError(error);
      }
    },

    async findTaskByHandbook(req, res) {
      const idHandbook = req.param('id_handbooks') 
    try {
      let readTrue = 0;
      let readFalse = 0;

      const tasks = await Task.find({ 
        where: {
          id_handbooks: idHandbook
        },
        select: ['read']
       })
       
       tasks.forEach(task => {
        task.read ? readTrue += 1 : readFalse += 1
       })

       res.json({ readTrue, readFalse })
    } catch (error) {
      console.error('Error:', error);
      res.serverError(error);
    }
  }
}
