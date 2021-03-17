import joi from '@hapi/joi';
import { Schema, model } from 'mongoose';

export const UsersEditValidationSchema = joi.object().keys({
  id: joi.number().required(),
  user: joi.string().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  seconName: joi.string(),
  city: joi.string().required(),
});


const UsuarioSchema = new Schema({
  user: { type: String, required: [true, 'El name es requerido'], unique: true  },
  password: { type: String, required: [true, 'El name es requerido'] },
  name: { type: String, required: [true, 'El name es requerido'] },
  secondName: { type: String },
  city: { type: String, required: [true, 'La ciudad es requerida'] },
});

export const Usuario = model('users', UsuarioSchema);