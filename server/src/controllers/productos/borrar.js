import { Producto } from '../../schemas/productos';

export const borrar = async (req, res) => {
  const products = await Producto.findByIdAndRemove(req.params.id
  );
  res.status(200).json(products);
};