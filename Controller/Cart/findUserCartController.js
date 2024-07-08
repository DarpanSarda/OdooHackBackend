const CartItemModel = require("../../Models/Cart/CartItemModel");
const CartModel = require("../../Models/Cart/CartModel");

const findUserCartController = async(req,res)=>{
    const user = req.user;
    try {
        let cart = await CartModel.findOne({user:user._id});
        let cartItems = await CartItemModel.find({cart:cart._id}).populate('product');

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
        return res.status(200).send({cart})
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = findUserCartController;