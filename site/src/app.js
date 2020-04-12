const chalk = require('chalk');
const express = require('express');
const app = express();

// Configuración
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/product', (req, res) => {
    res.sendFile(__dirname + '/views/productDetail.html')
});

app.get('/cart', (req, res) => {
    res.sendFile(__dirname + '/views/productCart.html')
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.get('/product/new', (req, res) => {
    res.sendFile(__dirname + '/views/productAdd.html')
});

app.listen(3000, () => console.log(chalk.bgGreen('Servidor escuchando en el puerto 3000')));