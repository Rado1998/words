var express = require('express');
var router = express.Router();
const { create, getByToken, getCartById } = require('../controllers/user.controller')

/* GET users listing. */
router.post('/registration', create);
router.get('/:token', getByToken);
router.get('/cart/:cartId', getCartById);


module.exports = router;
