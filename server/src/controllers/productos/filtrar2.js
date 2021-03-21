import { Product } from '../../models/products';

export const filtrar2 = async (req, res) => {
  const products = await Product.find(
    req.params
  );
  res.status(200).json(products);
};
