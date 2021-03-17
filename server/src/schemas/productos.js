import joi from '@hapi/joi';
import { Schema, model } from 'mongoose';

export const ProductsEditValidationSchema = joi.object().keys({
  id: joi.number().required(),
  name: joi.string().required(),
  image: joi.string().required(),
  available_quantity: joi.string().required(),
  price: joi.string().required(),
  description: joi.string(),
});


const ProductoSchema = new Schema({
  name: { type: String, required: [true, 'El name es requerido'] },
  image: {type: String},
  path: {type: String},
  available_quantity: { type: Number, required: [true, 'La cantidad es requerida'] },
  price: { type: Number, required: [true, 'El precio es requerido'] },
  description: { type: String, required: [true, 'La descripcion es requerida']},
});

export const Producto = model('products', ProductoSchema);