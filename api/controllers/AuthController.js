/**
 * AuthControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const jwt = require('jsonwebtoken');

module.exports = {
  login: async function(req, res) {
    try {
      const { email, password } = req.body;

      // Log the input data
      console.log("Login attempt with email:", email);

      // Verificar se o email e a senha foram fornecidos
      if (!email || !password) {
        console.log("Email or password not provided");
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      // Verificar se o usuário existe no banco de dados
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verificar se a senha está correta (simple string comparison)
      if (password !== user.password) {
        console.log("Invalid password for email:", email);
        return res.status(401).json({ error: 'Senha inválida' });
      }

      // Autenticação bem-sucedida
      console.log("User authenticated successfully:", user.id);
      // return res.status(200).json({ user });

      const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

      // return res.json({ token });
      return res.json({ user });

    } catch (error) {
      // Log the full error
      console.error("Error during login:", error);
      return res.status(500).json({ error: 'Erro com o servidor' });
    }
  }

};


