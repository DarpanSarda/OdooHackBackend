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
        let cart = await CartModel.findOne({user:user._id});
        let cartItems = await CartItemModel.find({cart:cart._id});
        cart.cartItems = cartItems;
        let totalPrice = 0;
        let totalItem=0;
        for(let cartIt of cart.cartItems)
        {
            totalPrice+=cartIt.price;
            totalItem+=cartIt.quantity;
        }
        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        
        const orderItems = [];

        for (const item of cart.cartItems) {
            const orderItem = new OrderItemModel({
                price: item.price,
                product: item.product,
                quantity:item.quantity,
                dimension:item.dimesnsion,
                userId:item.userId
            })
            const createdOrderItem = await orderItem.save();
            orderItems.push(createdOrderItem);
        }

        const createdOrder = new OrderModel({
            user,
            orderItems:orderItems._id,
            price:cart.totalPrice,
            totalItem:cart.totalItem,
            shipAddress:address,
        })

        const savedOrder = createdOrder.save();

        return res.status(200).send(savedOrder);
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = CreateOrder;