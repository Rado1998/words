const { Cart } = require('../models/cart.model');
const { User } = require('../models/user.model');
const mongoose = require('mongoose');



function create(req, res, next) {

    Cart.create(req.body).then((result) => {

        const userDate = {
            refId: mongoose.Types.ObjectId(result['_id']),
            status: 0
        }
        User.update({}, { $push: { carts: userDate } }, { multi: true }).then((resUser) => {
            res.status(200).json({
                message: 'create',
                data: result
            })
        }).catch((errUser) => {
            res.status(400).json({
                message: 'false',
                data: errUser
            })
        })

    }).catch((err) => {
        res.status(400).json({
            message: 'false',
            data: err
        })
    })

}

function index(req, res, next) {

    Cart.find({}).then((result) => {
        res.status(200).json({
            message: 'index',
            data: result
        })
    }).catch((err) => {
        res.status(400).json({
            message: 'false',
            data: err
        })
    })

}


module.exports = {
    create,
    index
}