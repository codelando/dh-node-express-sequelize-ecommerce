const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();

router.get('/', controller.index);

router.get('/register', controller.create);

router.get('/cart', (req, res) => {
    res.render('products/cart');
});

router.post('/', controller.store);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;