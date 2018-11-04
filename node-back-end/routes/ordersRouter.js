var express = require('express')
var router = express.Router();
var OrderCtrl = require('../controllers/OrderCtrl.js')

router.get('/orders', OrderCtrl.getAll);

router.get('/orders/count/', OrderCtrl.getCount);

router.get('/orders/:orderId', OrderCtrl.getOne)

router.post('/orders', OrderCtrl.add)

router.put('/orders/:orderId', OrderCtrl.replace)

router.delete('/cart/delete/:cartId', OrderCtrl.delete);

router.get('/ordersForClient/:clientId', OrderCtrl.getOneByClientId)

router.post('/order/checkDate', OrderCtrl.countOrdersOnDate)

router.post('/orders/:orderId', OrderCtrl.verifyOrder)


module.exports = router;
