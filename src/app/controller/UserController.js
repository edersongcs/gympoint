// Feature for create user

import User from '../models/User';

class UserController {
  // Create new user
  async store(req, res) {
    // Verifica se o informado no cadastro, já esta cadastrado
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    // Se o email já estiver sendo usado em outro cadastro, retorna a mensagem de bad_request
    if (userExists) {
      return res.status(400).json({ error: 'Usuario já existe.' });
    }

    // Seleciona apenas os dados que queremos retornar na tela
    const { id, name, email, age, weight, height } = await User.create(
      req.body
    );

    // Retorna os dados selecionados, no formato de um objeto -> {}
    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new UserController();
