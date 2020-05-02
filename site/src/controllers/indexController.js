const jsonDb = require('../database/jsonDatabase');
const productModel = jsonDb('products');

module.exports = {
    index: (req, res) => {
        let products = productModel.all();
        res.render('index/index', { products });
    }
}