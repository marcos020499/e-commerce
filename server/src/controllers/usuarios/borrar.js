import { Usuario } from '../../models/usuarios';

export const borrar = async (req, res) => {
  const users = await Usuario.findByIdAndRemove(req.params.id
  );
  res.status(200).json(users);
};