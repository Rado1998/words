const { Cart } = require('../models/cart.model');
const { User } = require('../models/user.model');

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "mongodb://localhost:27017/words"
});

let sendTimes = [
    "5", "9", "16"
]

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

async function getAllUsers(req, res, next) {
    User.find({}).then((result) => {
        res.status(200).json({
            message: 'success',
            data: result
        })
    })
        .catch((error) => {
            res.status(400).json({
                message: 'error',
                data: result
            })
        })

}

async function upadteStatus() {
    let users = await User.find({ 'carts.status': false }).populate('carts.refId');
    for (const user of users) {
        var count = 0;
        for (const cart of user['carts']) {
            if (cart['status'] == false) {
                try {
                    await User.updateOne({ _id: user['_id'], 'carts._id': cart['_id'] }, { $set: { 'carts.$.status': 1 } })
                    //stex uxarkel Xchoin
                    sendMessages(user['fireBaseToken'], cart['_id'])
                } catch (error) {
                    return error;
                }
                break;

            }

        }
    }
    return 0;
}

function sendMessages(fireBaseToken, cartId) {
    var payload = {
        notification: {
            title: "Words",
            body: "У Вас новая карточка"
        }
    };
    var options = {
        cartId: cartId
    };
    admin.messaging().sendToDevice(fireBaseToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}

async function getCartById(req, res, next) {
    Cart.findById(req.params.cartId)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: 'completed',
                    data: result
                })
            }
            else {
                res.status(400).json({
                    message: 'error',
                    data: 'Cart not found'
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                message: 'error',
                error: error
            })
        })
    return 0;
}


setInterval(() => {
    let hours = new Date().getUTCHours();
    let minutes = new Date().getUTCMinutes();
    if (minutes < 2) {
        let index = sendTimes.indexOf(hours.toString());
        if (index > -1) {
            upadteStatus();
        }
    }


}, 1000)
module.exports = {
    create,
    getByToken,
    getCartById,
    getAllUsers
}