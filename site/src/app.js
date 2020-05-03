// Paquetes
const chalk = require('chalk');
const express = require('express');
const app = express();
const methodOverride = require('method-override');

// Configuración

// Motor de vistas
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Formularios
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rutas
app.get('/', require('./controllers/indexController').index);
app.use('/', require('./routes/user'));
app.use('/products', require('./routes/product'));

// Servidor
app.listen(3000, () => console.log(chalk.bgGreen('Servidor escuchando en el puerto 3000')));