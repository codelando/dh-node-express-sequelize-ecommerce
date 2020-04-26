const express = require('express');
const router = express.Router();

router.get('/detail', (req, res) => {
    res.render('products/detail');
});

router.get('/cart', (req, res) => {
    res.render('products/cart');
});

router.get('/new', (req, res) => {
    res.render('products/add');
});


module.exports = router;