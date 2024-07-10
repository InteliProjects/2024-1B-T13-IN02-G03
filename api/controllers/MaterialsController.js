/**
 * MaterialsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/MaterialsController.js

module.exports = {

  // Ação para obter os detalhes de um tipo de material específico
  async findOne(req, res) {
    try {
      // Obtém o ID do material a partir dos parâmetros da requisição
      const materialId = req.param('id');
      
      // Verifica se o ID foi fornecido
      if (!materialId) {
        return res.status(400).json({ error: 'Material ID is required' });
      }

      // Busca o material pelo ID fornecido
      const material = await Material.findOne({ id: materialId });

      // Se o material não for encontrado, retorna um erro 404
      if (!material) {
        return res.status(404).json({ error: 'Material not found' });
      }

      // Retorna os detalhes do material encontrado
      return res.json(material);
    } catch (error) {
      // Em caso de erro, retorna um erro do servidor
      return res.serverError(error);
    }
  },

  // Ação para criar um novo material
  async create(req, res) {
  try {
    // Obtenha os dados do corpo da requisição
    const { file, type, title, id_handbooks } = req.body;

    // Verifique se os campos obrigatórios estão presentes
    if (!file || !type || !title || !id_handbooks) {
      return res.status(400).json({ error: 'File, type, and title are required' });
    }

    // Crie um novo material com os dados fornecidos
    const newMaterial = await Material.create({ file, type, title, id_handbooks }).fetch();

    // Retorne o material criado com status 201 (Created)
    return res.status(201).json(newMaterial);
  } catch (error) {
    // Em caso de erro, retorne uma resposta de erro do servidor
    return res.serverError(error);
  }
},


// TESTE ENVIAR MAIS DE UM ARQUIVO (DESCOBRIR COMO FAZER)

};
