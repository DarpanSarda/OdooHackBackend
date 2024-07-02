const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    orderItems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderItems",
    },
    orderDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    deliveryDate:{
        type:Date
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses",
    },
    paymentDetails:{
        paymentMethod:{
            type:String,
        },
        transactionId:{
            type:String,
        },
        paymentId:{
            type:String,
        },
        paymentStatus:{
            type:String,
            default:"pending"
        }
    },
    totalPrice:{
        type:Number,
        // required:true
    },
    totalItem:{
        type:Number,
        // required:true
    },
    orderStatus:{
        type:String,
        required:true,
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const  OrderModel = mongoose.model('orders',OrderSchema);
module.exports = OrderModel;