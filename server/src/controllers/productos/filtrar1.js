import { Product } from '../../models/products';

export const filtrar1 = async (req, res) => {
  const products = await Product.find(
    req.params
  );
  res.status(200).json(products);
};
