import { Product } from '../../models/products';

export const price2000 = async (req, res) => {
  const products = await Product.find(
    {'price': {$gt : 2000, }}
  );
  res.status(200).json(products);
};
