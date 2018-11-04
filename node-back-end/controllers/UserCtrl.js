var User = require('../models/User.js')
class UserCtrl {
	static getAll (req, res) {
		var db = req.app.get('db');
		User.getAll(db)
		.then(data => {
			res.json(data)
		})
	}
	static getOne (req, res) {
		var db = req.app.get('db')
		User.getOne(db, req.params.userId)
		.then(data => {
			res.json(data)
		})
	}
	static add (req, res) {
		var db = req.app.get('db')
		User.add(db, req.body)
		.then(result => {
			req.session.userid = result.insertedId;
			console.log(req.session)
			res.send(result.insertedId)
		})
	}

	static replace (req, res) {
		var db = req.app.get('db')
		User.replace(db, req.params.userId, req.body);
		res.send(204);
	}
	static login (req, res) {
		var db = req.app.get('db')
		User.login(db, req.body)
		.then(data => {
			if (data) {req.session.userid = data['_id'];}
			console.log(req.session.userid)
			res.json(data)
		})
	}

	static checkLogin (req, res) {
		if (req.session.userid) {
			var db = req.app.get('db')
			User.getOne(db, req.session.userid)
			.then(data => {
				res.json(data)
				console.log(req.session)
			})
		} else {
			console.log('No one is connected')
			//res.send(401)
			res.send(false)
		}
	}

	static getByEmail (req, res) {
		var db = req.app.get('db')
		console.log(req.body)
		User.getByEmail(db, req.body.email)
		.then(data => {
			res.json(data)
		})
	}

	static logout (req, res) {
		delete req.session.userid
		res.status(200).json("success")
	}
}

module.exports = UserCtrl