import { Usuario } from '../../schemas/usuarios';

export const editar = async (req, res, next) => {
  const users = await Usuario.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
  const db = await users.save();
  res.status(201).json(db);
};
