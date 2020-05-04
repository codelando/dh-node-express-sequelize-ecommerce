const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();

const userRoute = require('../middlewares/userRoute');

router.get('/', controller.index);

router.get('/create', userRoute, controller.create);

router.post('/', userRoute, controller.store);

router.get('/cart', (req, res) => {
    res.render('products/cart');
});

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;