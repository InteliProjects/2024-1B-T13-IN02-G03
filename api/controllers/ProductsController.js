/**
 * ProductController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @docs        :: https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Obter uma lista de todos os produtos
  async find(req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Obter os detalhes de um produto
  async findOne(req, res) {
    try {
      const productId = req.param('id');
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const product = await Product.findOne({ id: productId });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(product);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Criar um novo produto
  async create(req, res) {
    try {
      const { name, type, model } = req.body;
      if (!name || !type || !model) {
        return res.status(400).json({ error: 'Name, type, and model are required' });
      }

      const newProduct = await Product.create({ name, type, model }).fetch();
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Atualizar um produto existente
  async update(req, res) {
    try {
      const productId = req.param('id');
      const { name, type, model } = req.body;

      if (!name || !type || !model) {
        return res.status(400).json({ error: 'Name, type, and model are required' });
      }

      const updatedProduct = await Product.updateOne({ id: productId }).set({ name, type, model });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(updatedProduct);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Remover um produto existente
  async destroy(req, res) {
    try {
      const productId = req.param('id');
      const deletedProduct = await Product.destroyOne({ id: productId });

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(deletedProduct);
    } catch (error) {
      return res.serverError(error);
    }
  }
};
