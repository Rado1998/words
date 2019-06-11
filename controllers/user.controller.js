const { Cart } = require('../models/cart.model');
const { User } = require('../models/user.model');

function create(req, res, next) {
    Cart.find({}, { _id: 1 }).then((carts) => {

        carts = carts.map((c) => {
            c = c.toObject()
            c.refId = c._id;
            delete c._id;
            return c;
        })
        req.body.carts = carts;
        User.create(req.body).then((result) => {

            res.status(200).json({
                message: 'created',
                data: result
            })

        }).catch((err) => {
            res.status(400).json({
                message: 'false',
                data: err
            })
        })
    }).catch((cartErr) => {
        res.status(400).json({
            message: 'false',
            data: cartErr
        })
    })
}

function getByToken(req, res, next) {
    User.findOne({ deviceToken: req.params.token })
        .populate('carts.refId')
        .then((result) => {


            res.status(200).json({
                message: 'created',
                data: result
            })


        }).catch((err) => {
            res.status(400).json({
                message: 'false',
                data: err
            })
        })
}

async function upadteStatus(req, res, next) {
    console.log('mtav')
    let users = await User.find({ 'carts.status': false }).populate('carts.refId');
    console.log(users)
    for (const user of users) {
        for (const cart of user['carts']) {
            console.log(cart)
            if (cart['status'] == false) {
                try {
                    await User.updateOne({ _id: user['_id'], 'carts._id': cart['_id'] }, { $set: { 'carts.$.status': 1 } })
                    //stex uxarkel Xchoin

                } catch (error) {
                   return error;
                }
                break;

            }

        }
    }
   return 0;
}

setInterval(upadteStatus,14400000)
module.exports = {
    create,
    getByToken
}