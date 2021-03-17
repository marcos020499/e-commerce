import { Product } from '../../models/products';

export const editar = async (req, res, next) => {
  const products = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
  const db = await products.save();
  res.status(201).json(db);
};
