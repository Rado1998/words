const { Schema, mongoose } = require('.');

const UserSchema = new Schema({
    carts: [{
        refId: {
            type: Schema.Types.ObjectId,
            ref: "cart",
        },
        status: {
            type: Boolean,
            default: 0
        }

    }],
    deviceToken: {
        type: String,
        required: true,
        unique: true
    },
    fireBaseToken: {
        type: String,
        required: true,
        unique: true
    }
}, { usePushEach: true, timestamps: true })

const User = mongoose.model('user', UserSchema);

module.exports = {
    User
}