const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.show);

router.get('/cart', (req, res) => {
    res.render('products/cart');
});

router.get('/new', (req, res) => {
    res.render('products/add');
});


module.exports = router;