const chalk = require('chalk');
const express = require('express');
const app = express();

// Configuración
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', require('./controllers/indexController').index);
app.use('/', require('./routes/user'));
app.use('/products', require('./routes/product'));

app.listen(3000, () => console.log(chalk.bgGreen('Servidor escuchando en el puerto 3000')));