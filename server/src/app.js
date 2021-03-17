import express from 'express';
var cors = require('cors')
const app = express();
import usuarios from './routes/usuarios';
import productos from './routes/productos';
import cart from './routes/cart';
import bodyParser from 'body-parser';
const morgan = require('morgan');
const path = require('path');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/usuarios', usuarios);

app.use('/productos', productos);
app.use('/cart', cart);


// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use('/uploads', express.static('/uploads'));
// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

export default app;