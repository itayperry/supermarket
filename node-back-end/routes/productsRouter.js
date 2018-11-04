var express = require('express')
var router = express.Router();
var ProductCtrl = require('../controllers/ProductCtrl.js');

router.get('/products/categories', ProductCtrl.getCategories);

router.get('/products/count/', ProductCtrl.getCount);

router.get('/products', ProductCtrl.getAll);

router.get('/products/:productId', ProductCtrl.getOne);

router.get('/products/category/:categoryId', ProductCtrl.getProdsByCat);

router.post('/products', ProductCtrl.add);

router.put('/products/:productId', ProductCtrl.replace);

module.exports = router;
