var Product = require('../models/Product.js')
class ProductCtrl {
	
	static getAll (req, res) {
		var db = req.app.get('db')
		Product.getAll(db)
		.then(data => {
			res.json(data)
		})
	}

	static getCount (req, res) {
		var db = req.app.get('db')
		Product.getCount(db)
		.then(data => {
			res.json(data)
		})
	}

	static getOne (req, res) {
		var db = req.app.get('db')
		Product.getOne(db, req.params.productId)
		.then(data => {
			res.json(data)
		})
	}
	static getProdsByCat (req, res) {
		var db = req.app.get('db')
		Product.getProdsByCat(db, req.params.categoryId)
		.then(data => {
			res.json(data[0].productsOfCat)
		})
	}
	static add (req, res) {
		var db = req.app.get('db')
		Product.add(db, req.body);
		res.send(204);
	}

	static replace (req, res) {
		var db = req.app.get('db')
		Product.replace(db, req.params.productId, req.body).then(data =>{
			res.send(204);
		})
	}

	static getCategories (req, res) {
		var db = req.app.get('db')
		Product.getCategories(db)
		.then(data => {
			res.json(data)
		})
	}
}

module.exports = ProductCtrl
