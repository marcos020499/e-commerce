import express from 'express';
const server = express();
import app from './src/app';
import { config } from './src/config/constants';
import { DBConnection } from './src/config/DBConnection';

server.use('/api', app);
app.use('/uploads', express.static('/uploads'));
DBConnection()
  .then(() => console.log('DB Connected marco'))
  .catch((err) => {
    throw new Error('No se puede conectar a la DB', err);
  });

app.use(express.static("client/build"));
server.listen(config.PORT, () => {
  console.log('servidor corriendo en el puerto ' + config.PORT);
});