import express from 'express';
const app = express();
const path = require("path");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import { config } from './src/config/constants';
import { DBConnection } from './src/config/DBConnection';

const mongoose = require("mongoose");
DBConnection()
  .then(() => console.log('DB Connected'))
  .catch((err) => {
    throw new Error('No se puede conectar a la DB', err);
  });

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/api/productos', require('./src/routes/productos'));
  app.use('/api/usuarios', require('./src/routes/usuarios'));
  
  app.use('/uploads', express.static('uploads'));

  if (process.env.NODE_ENV === "production") {
  
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }
  
  const port = process.env.PORT || 8080
  
  app.listen(config.PORT, () => {
    console.log('servidor corriendo en el puerto ' + config.PORT);
  })
