var express = require('express');
var router = express.Router();
const {create,getByToken} = require('../controllers/user.controller')

/* GET users listing. */
router.post('/registration',create);
router.get('/:token',getByToken);



module.exports = router;
