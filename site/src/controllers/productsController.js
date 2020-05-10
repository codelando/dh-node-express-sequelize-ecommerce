const jsonDb = require('../database/jsonDatabase');
const productModel = jsonDb('products');

module.exports = {
    index: (req, res) => {
        let products = productModel.all();
        res.render('products/index', { products });
    },
    show: (req, res) => {
        let product = productModel.find(req.params.id);
        if(product) {
            res.render('products/show', { product });
        } else {
            res.render('products/404');
        }
    },
    create: (req, res) => {
        res.render('products/create');
    },
    store: (req, res) => {
        product = req.body;
        product.image = req.file ? req.file.filename : '';
        product.keywords = product.keywords.split(' ');
        
        productId = productModel.create(req.body);

        res.redirect(`/products/${productId}`)
    },
    edit: (req, res) => {
        let product = productModel.find(req.params.id);
        
        if(product) {
            product.keywords = product.keywords.join(' ');
            res.render('products/edit', { product });
        } else {
            res.render('products/404');
        }
    },
    update: (req, res) => {

        product = req.body;
        product.id = req.params.id;
        
        product.image = req.params.image ? req.body.image : req.body.oldImage;
        delete product.oldImage;

        product.keywords = product.keywords.split(' ');
        
        productId = productModel.update(product);

        res.redirect(`/products/${productId}`)
    },
    destroy: (req, res) => {
        productModel.delete(req.params.id);

        res.redirect(`/products/`)
    }
}