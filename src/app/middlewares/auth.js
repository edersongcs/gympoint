import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Valida se o id do usuario logado é = 1(id do admin), se for ele prosegue, se nao para.
    if (decoded.id !== 1) {
      return res.status(401).json({ error: 'Usuario sem permissão.' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
