import express from 'express';
import { agregar , listar} from '../controllers/cart';
const app = express();


app.post("/agregar/:id", agregar);
app.get('/listar/:id', listar);

export default app;