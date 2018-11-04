var express = require('express');
var mongodb = require('mongodb');
var cors = require('cors');
var MongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var usersRouter = require('./routes/usersRouter');
var productsRouter = require('./routes/productsRouter');
var ordersRouter = require('./routes/ordersRouter');
var session = require('express-session');
var connectionPromise = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }); // it's a promise
var db;

var app = express();
app.use(session({
  name: 'userId',
  secret: 'my express secret',
  saveUninitialized: false,
  resave: true
  // cookie: { maxAge: 600000 }
}));
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));
app.use(bodyParser.json());
app.use(usersRouter);
app.use(productsRouter);
app.use(ordersRouter);

connectionPromise.then(connection => {
	db = connection.db('supermarket')	
	app.set('db', db)		
	app.listen('3000', () => {
		console.log('listen')
	})
}).catch(err => console.error(err));