const jsonDb = require('../database/jsonDatabase');
const productModel = jsonDb('products');

module.exports = {
    index: (req, res) => {
        let products = productModel.all();
        res.render('products/index', { products });
    },
    show: (req, res) => {
        let product = productModel.find(req.params.id);
        res.render('products/show', { product });
    }
}