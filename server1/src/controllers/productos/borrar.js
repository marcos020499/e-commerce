import { Product } from '../../models/products';

export const borrar = async (req, res) => {
  const products = await Product.findByIdAndRemove(req.params.id
  );
  res.status(200).json(products);
};