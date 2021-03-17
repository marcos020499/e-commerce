import { Product } from '../../models/products';

export const filtrar = async (req, res) => {
  const products = await Product.findById(
    req.params.id
  );
  res.status(200).json(products);
};
