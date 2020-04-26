const chalk = require('chalk');
const express = require('express');
const app = express();

// Configuración
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', require('./routes/user'));
app.use('/product', require('./routes/product'));

app.listen(3000, () => console.log(chalk.bgGreen('Servidor escuchando en el puerto 3000')));