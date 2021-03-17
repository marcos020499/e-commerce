import express from 'express';
import { borrar, listar, crear, editar, filtrar, login } from '../controllers/usuarios';
const app = express();
/*
app.get('/listar', listar);
app.delete('/listar/:id', borrar);
app.get('/filtrar/:id', filtrar);
app.post('/editar/:id', editar);*/
app.post('/login', login);
app.post('/crear', crear);

export default app;