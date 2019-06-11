var express = require('express');
var router = express.Router();
const {create} = require('../controllers/cart.controller')

/* GET users listing. */
router.post('/cart',create);

module.exports = router;
