const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName : {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    role : {
        type:String,
        required:true,
        default:"customer",
    },
    mobile:{
        type:String
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    // paymentInfo:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Payment_info"
    // }],
    // ratings:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"ratings"
    // }],
    // reviews:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"reviews"
    // }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel;