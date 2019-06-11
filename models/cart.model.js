const {Schema,mongoose} = require('.');

const CartSchema = new Schema({
    name :{
        type :String,
        required : true
    },
    image : {
        type : String,
        default : ""
    },
    video : {
        type : String,
        default : ""
    }
}, { usePushEach: true, timestamps: true }) 

const Cart = mongoose.model('cart',CartSchema);

module.exports = {
    Cart
}