const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number
    },
    brand:{
        type:String
    },
    renter:{
        type:String
    },
    Image:[
        {
            image1:{
                type:String,
            },
            image2:{
                type:String,
            },
            image3:{
                type:String,
            },
            image4:{
                type:String,
            }
        }
    ],
    color:{
        type:String
    },
    Dimensions:{
        type:String,
    },
    ParentCategory:{
        type:String,
    },
    Category:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const ProductModel = mongoose.model('products',ProductSchema);
module.exports = ProductModel;