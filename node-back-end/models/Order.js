var ObjectId = require('mongodb').ObjectId;

class Order {

	static getAll (db) {
		return db.collection('orders').find().toArray()
	}

	static getCount (db) {
		return db.collection('orders').find({"order.checkout": true}).count()
	}

	static getOne (db, orderId) {
		return db.collection('orders').aggregate([
		   {
		      $match: { _id: new ObjectId(orderId) }
		   },
		   {
		      $lookup:
		         {
		            from: "users",
		            localField: "customerId",
		            foreignField: "_id",
		            as: "customer"
		        }
		   },
		   {
		      $lookup:
		         {
		            from: "products",
		            localField: "items.productId",
		            foreignField: "_id",
		            as: "products"
		        }
		   }
	   ]).toArray()
	}

	static add (db, newOrder) {
    	delete newOrder.items[0].productInfo;
    	newOrder.customerId = new ObjectId(newOrder.customerId)
    	newOrder.items[0].productId = new ObjectId(newOrder.items[0].productId);
    	newOrder.order.shippingDate = new Date(newOrder.order.shippingDate)
    	console.log(newOrder)
		return db.collection('orders').insertOne(newOrder);
	}

	static replace (db, orderId, updatedOrder) {
		for (var i = 0; i < updatedOrder.items.length; ++i) {
			updatedOrder.items[i].productId = new ObjectId(updatedOrder.items[i].productId);
  			delete updatedOrder.items[i].productInfo;
  		}
		console.log(updatedOrder)
		return db.collection('orders').replaceOne(
			{_id: new ObjectId(orderId)}, // search
		    {
		      _id: new ObjectId(updatedOrder['_id']),
		      customerId: new ObjectId(updatedOrder.customerId),
		  	  items: updatedOrder.items,
		  	  order: updatedOrder.order
		  	},
		    { upsert: true }
		)
	}

	static getOneByClientId(db, clientId) {
		return db.collection('orders').aggregate([
		   {
		      $match: { customerId: new ObjectId(clientId), "order.checkout": false }
		   },
		   {
		      $lookup:
		         {
		            from: "products",
		            localField: "items.productId",
		            foreignField: "_id",
		            as: "products"
		        }
		   }
	   ]).toArray()
	}

	static delete (db, cartId) {
		db.collection('orders').remove({_id: new ObjectId(cartId)});
	}

	static countOrdersOnDate (db, dateObj) {
		return db.collection('orders').find(
    		{
        		"order.shippingDate": new Date (dateObj.date)
    		}
		).count()
	}

	static verifyOrder (db, orderId, order) {
		console.log(order)
		return db.collection('orders').updateOne(
   			{ _id: new ObjectId(orderId) },
   			{$set:
    				{
      					"order.checkout": true,
      					"order.shippingDate": new Date(order.date),
      					"order.city": order.city,
						"order.street": order.street,
						"order.lastDigits": order.creditCard.toString().slice(-4),
      					"order.orderDate": new Date()
     				}
  		 	}
		)
	}
}

module.exports = Order
