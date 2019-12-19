// Feature for validation login
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  // Create session
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação. ' });
    }

    // seleciona o email e senha fornecido pelo usuario
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Se o usuario não existi, retorna mensagem de erro
    if (!user) {
      return res.status(401).json({ error: 'Usuario não existe' });
    }

    // Verifica se a senha esta correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não corresponde' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
