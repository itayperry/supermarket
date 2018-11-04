var ObjectId = require('mongodb').ObjectId;

class User {
	static getAll (db) {
		return db.collection('users').find().toArray()
	}
	static getOne (db, userId) {
		return db.collection('users').findOne(
			{_id: new ObjectId(userId)}
		)
	}
	static add (db, newUser) {
		return db.collection('users').insertOne({
			name: newUser.name,
			lastName: newUser.last_name,
			username: newUser.username,
			password: newUser.password,
			city: newUser.city,
			street: newUser.street
		});
	}

	static replace (db, userId, updatedUser) {
		db.collection('users').updateOne(
			{_id: new ObjectId(userId)}, // search
			{$set: updatedUser} // update
		);
	}

	static login (db, userDetails) {
		return db.collection('users').findOne(
			{
				username: userDetails.username, 
				password: userDetails.password
			}
		)
	}

	static getByEmail (db, userEmail) {
		return db.collection('users').findOne(
			{
				username: userEmail
			}
		)
	}
}

module.exports = User