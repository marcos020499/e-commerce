import { Producto } from '../../schemas/productos';

export const listar = async (req, res) => {
  const products = await Producto.find();
  res.status(200).json(products);
};