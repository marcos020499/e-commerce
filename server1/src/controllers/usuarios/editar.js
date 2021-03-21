import { Usuario } from '../../models/usuarios';

export const editar = async (req, res, next) => {
  const users = await Usuario.find(req.params, {
      $set: req.body
    });
  const db = await users.save();
  res.status(201).json(db);
};
