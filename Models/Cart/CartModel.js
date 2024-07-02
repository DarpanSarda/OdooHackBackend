const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cartitems",
        required:true
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalItem:{
        type:Number,
        required:true,
        default:0
    },
})

const CartModel = mongoose.model('cart',CartSchema);
module.exports = CartModel;