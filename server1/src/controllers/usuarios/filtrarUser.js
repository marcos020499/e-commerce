import { Usuario } from '../../models/usuarios';

export const filtrarUser = async (req, res) => {
  const users = await Usuario.find(
    req.params
  );
  res.status(200).json(users);
};
