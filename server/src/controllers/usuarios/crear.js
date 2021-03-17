import { Usuario } from '../../schemas/usuarios';

export const crear = async (req, res) => {
  console.log(req.body);
  const user = new Usuario(req.body);
  const db = await user.save();
  res.status(201).json(db);
};