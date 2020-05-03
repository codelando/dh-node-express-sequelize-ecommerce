const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/', controller.store);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

router.get('/cart', (req, res) => {
    res.render('products/cart');
});

module.exports = router;