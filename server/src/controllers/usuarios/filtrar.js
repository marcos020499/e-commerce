import { Usuario } from '../../schemas/usuarios';

export const filtrar = async (req, res) => {
  const users = await Usuario.findById(
    req.params.id
  );
  res.status(200).json(users);
};
