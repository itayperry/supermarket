var express = require('express')
var router = express.Router();
var UserCtrl = require('../controllers/UserCtrl.js')

router.post('/users/login', UserCtrl.login)

router.get('/users/logout', UserCtrl.logout)

router.get('/dashboard', UserCtrl.checkLogin)

router.post('/users/email/', UserCtrl.getByEmail)

router.get('/users', UserCtrl.getAll)

router.get('/users/:userId', UserCtrl.getOne)

router.post('/users', UserCtrl.add)

router.put('/users/:userId', UserCtrl.replace)


module.exports = router;