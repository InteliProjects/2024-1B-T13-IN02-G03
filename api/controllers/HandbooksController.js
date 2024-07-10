/**
 * HandbooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Método para buscar todos os handbooks
  async find(req, res) {
    try {
      const handbooks = await Handbook.find({select:['version', 'title']});
      return res.json(handbooks);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Método para buscar um handbook específico pelo ID
  async findOne(req, res) {
    try {
      const handbook = await Handbook.findOne({ id: req.params.id });
      if (!handbook) {
        return res.notFound({ error: "Handbook not found" });
      }
      return res.json(handbook);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Método para criar um novo handbook
  async create(req, res) {
    try {
      const handbook = await Handbook.create(req.body).fetch();
      return res.status(201).json(handbook);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Método para atualizar um handbook existente pelo ID
  async update(req, res) {
    try {
      const updatedHandbook = await Handbook.updateOne({
        id: req.params.id,
      }).set(req.body);
      if (!updatedHandbook) {
        return res.notFound({ error: "Handbook not found" });
      }
      return res.json(updatedHandbook);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Método para deletar um handbook pelo ID
  async destroy(req, res) {
    try {
      const deletedHandbook = await Handbook.destroyOne({ id: req.params.id });
      if (!deletedHandbook) {
        return res.notFound({ error: "Handbook not found" });
      }
      return res.json({ message: "Handbook deleted successfully" });
    } catch (error) {
      return res.serverError(error);
    }
  },
  // Método para buscar todos os materiais associados a um manual
  
  async findMaterialsByManualId(req, res) {
    try {
      const manualId = req.param('id');

      // Encontrar todos os materiais associados ao manualId
      const materials = await Material.find({ id_handbooks : manualId });

      return res.json(materials);
    } catch (error) {
      return res.serverError(error);
    }

  },
  // Método para alterar o status de leitura de um manual
  async updateRead(req, res) {
    const idHandbook = req.param('id_handbooks');
    const idUsers = req.param('id_users');

    try {
      const task = await Task.findOne({
        where: {
          id_users: idUsers,
          id_handbooks: idHandbook
        },
        select: ['id']
      });

      if (!task) {
        return res.notFound({ message: 'Task not found' });
      }

      const updatedTask = await Task.updateOne({ id: task.id }).set({
        read: !task.read  // Alternar o estado de 'read'
      });

      return res.json(updatedTask);
    } catch (error) {
      return res.serverError(error);
    }
  }
}

