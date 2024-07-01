const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    street:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    mobile:{
        type:String,
        require:true
    },
})

const AddressModel = mongoose.model('addresses',AddressSchema);
module.exports = AddressModel;