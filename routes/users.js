var express = require('express');
var router = express.Router();
const { create, getByToken, getCartById,getAllUsers } = require('../controllers/user.controller')

/* GET users listing. */
router.post('/registration', create);
router.get('/all',getAllUsers)
router.get('/cart/:cartId', getCartById);
router.get('/:token', getByToken);


module.exports = router;
