var Order = require('../models/Order.js');
var ObjectId = require('mongodb').ObjectId;
class OrderCtrl {
	static getAll (req, res) {
		var db = req.app.get('db')
		Order.getAll(db)
		.then(data => {
			res.json(data)
		})
	}

	static getOne (req, res) {
		var db = req.app.get('db')
		Order.getOne(db, req.params.orderId)
		.then(data => {
			res.json(data)
		})
	}

	static getCount (req, res) {
		var db = req.app.get('db')
		Order.getCount(db)
		.then(data => {
			res.json(data)
		})
	}

	static replace (req, res) {
		console.log(req.session)
		console.log('I was called to replace')
		var db = req.app.get('db')
		Order.replace(db, req.params.orderId, req.body).then(data =>{
			res.json(data)
			// res.sendStatus(204);
		})
	}

	static getOneByClientId(req, res) {
		var db = req.app.get('db')
		Order.getOneByClientId(db, req.params.clientId)
		.then(data => {
			if (data.length > 0) {
				var cart = data[0];
				cart.items.map(item => {
					item.productInfo = cart.products.find(prod => String(item.productId) === String(prod['_id']));
					return item;
				});
				delete cart.products; // This info is unnecessary
				delete cart.items.productId; // This info is unnecessary
				res.json(cart);
			} else {
				//res.sendStatus(404)
				res.end();
			}
		})
	}

	static delete (req, res) {
		var db = req.app.get('db');
		Order.delete(db, req.params.cartId);
		res.send(204);

	}

	static add (req, res) {
		var db = req.app.get('db')
		Order.add(db, req.body)
		.then(result => {
			res.send(result.insertedId)
		})
	}

	static countOrdersOnDate(req, res){ //how many on a specific day
		var db = req.app.get('db');
		Order.countOrdersOnDate(db, req.body)
		.then(data =>{
			res.json(data)
		})
	}

	static verifyOrder(req, res){
		var db = req.app.get('db');
		Order.verifyOrder(db, req.params.orderId, req.body)
		.then(data =>{
			res.json(data)
		})
	}
}

module.exports = OrderCtrl
