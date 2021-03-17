import { Usuario } from '../../schemas/usuarios';

export const listar = async (req, res) => {
  const users = await Usuario.find();
  res.status(200).json(users);
};