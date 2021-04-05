import { Product } from '../../models/products';

export const price0 = async (req, res) => {
  const products = await Product.find(
    {'price': {$gt : 0, $lt: 2000 }}
  );
  res.status(200).json(products);
};
