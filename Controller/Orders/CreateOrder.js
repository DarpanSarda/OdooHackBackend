const AddressModel = require("../../Models/Addresses/AddressModel");
const CartItemModel = require("../../Models/Cart/CartItemModel");
const CartModel = require("../../Models/Cart/CartModel");
const OrderItemModel = require("../../Models/Order/OrderItems");
const OrderModel = require("../../Models/Order/OrderModel");

const CreateOrder = async(req,res)=>{
    const user = await req.user;
    try {
        let address;
        if(req.body._id)
        {
            let existAddress = await AddressModel.findById(req.body._id);
            address = existAddress;
        }
        else
        {
            address = new AddressModel(req.body);
            address.user = user;
            await address.save();

            user.address.push(address);
            await user.save();
        }
        console.log(address)
        let cart = await CartModel.findOne({user:user._id});
        console.log(cart)
        let cartItems = await CartItemModel.find({cart:cart._id});
        console.log("cartItemssssss :  ",cartItems)
        cart.cartItems = cartItems;
        let totalPrice = 0;
        let totalItem=0;
        for(let cartIt of cartItems)
        {
            totalPrice+=cartIt.price;
            totalItem+=cartIt.quantity;
        }
        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        console.log("total price  :  ",totalPrice)
        
        let orderItems = [];

        for (const item of cartItems) {
            const orderItem = new OrderItemModel({
                price: item.price,
                product: item.product,
                quantity:item.quantity,
                dimension:item.dimesnsion,
                userId:item.userId
            })
            console.log("order Item  ?:  ",orderItem)
            const createdOrderItem = await orderItem.save();
            console.log(createdOrderItem)
            orderItems.push(createdOrderItem);
            console.log(orderItems)
        }
        console.log(cart.totalPrice)
        const createdOrder = new OrderModel({
            user,
            orderItems:orderItems._id,
            totalPrice:cart.totalPrice,
            totalItem:cart.totalItem,

            shipAddress:address,
        })
        console.log("createdOrder   :: " , createdOrder.totalItem)

        const savedOrder = await createdOrder.save();
        return res.status(200).send(savedOrder);
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = CreateOrder;