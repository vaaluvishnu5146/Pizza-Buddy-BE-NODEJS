const mongoose = require('mongoose')
var Schema = mongoose.Schema;


const AddressSchema = new Schema({
    addressType:{type:String,required:true},
    address:{type:String,required:true}
})

const UserScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required:true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default: 'User',
        required: true
    },
    phoneNumber: {
        type: Number
    },
    createdTime : { type : Date, default: Date.now },
    address: [AddressSchema],
    previousOrders: [mongoose.Schema.Types.ObjectId],
    wishlist: [mongoose.Schema.Types.ObjectId]
});



module.exports = mongoose.model('User', UserScheme)
