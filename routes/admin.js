var express = require('express');
var router = express.Router();
const { create, index } = require('../controllers/cart.controller')

/* GET users listing. */
router.post('/cart', create);
router.get('/cart', index);

module.exports = router;
