var ObjectId = require('mongodb').ObjectId;

class Product {
	static getAll (db) {
	    return db.collection('products').find().toArray()
	}

	static getCount (db) {
		return db.collection('products').count()
	}

	static getOne (db, productId) {
		return db.collection('products').aggregate([
		   {
		      $match: { _id: new ObjectId(productId) }
		   },
		   {
		      $lookup:
		         {
		            from: "categories",
		            localField: "categoryId",
		            foreignField: "_id",
		            as: "category"
		        }
		   }
	   ]).toArray()
	}

	static getProdsByCat (db, categoryId) {
	   return db.collection('categories').aggregate([
		   {
		      $match: { _id: new ObjectId(categoryId) }
		   },
		   {
		      $lookup:
		         {
		            from: "products",
		            localField: "_id",
		            foreignField: "categoryId",
		            as: "productsOfCat"
		        }
		   }
	   ]).toArray()
	}

	static add (db, newProduct) {
		newProduct.categoryId = new ObjectId(newProduct.categoryId)
		db.collection('products').insertOne(newProduct);
	}

	static replace (db, productId, updatedProduct) {
		updatedProduct.categoryId = new ObjectId(updatedProduct.categoryId)
		return db.collection('products').updateOne(
			{_id: new ObjectId(productId)}, // search
			{$set: updatedProduct} // update
		);
	}

	static getCategories (db) {
		return db.collection('categories').find().toArray()
	}
}

module.exports = Product
