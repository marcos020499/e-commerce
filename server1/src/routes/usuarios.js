import express from 'express';
import { borrar, listar, crear, editar, filtrar, login } from '../controllers/usuarios';
const router = express.Router();

router.get('/listar', listar);
router.delete('/listar/:id', borrar);
router.get('/filtrar/:id', filtrar);
router.post('/editar/:id', editar);
router.post('/login', login);
router.post('/crear', crear);

module.exports = router;