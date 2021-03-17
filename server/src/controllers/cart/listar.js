import { Cart } from '../../schemas/cart';

export const listar = async (req, res) => {
  const cart = await Cart.findById();
  res.status(200).json(cart);
};