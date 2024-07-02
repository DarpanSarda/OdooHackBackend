const CartItemModel = require("../../Models/Cart/CartItemModel");
const CartModel = require("../../Models/Cart/CartModel");
const ProductModel = require("../../Models/Products/ProductModel");

const AddItemtoCart = async(req,res)=>{
    const user = req.user;
    try {
        let cart = await CartModel.findOne({user:user._id});
        console.log("cart",cart)
        console.log(user._id)
        const product = await ProductModel.findById(req.body.productId);
        console.log(req.body.productId)
        console.log(product)
        console.log("cartId",cart._id)
        const isPresent = await CartItemModel.findOne({cart:cart._id,product:req.productId,userId:user._id})
        if(!isPresent)
        {
            const CartItem = new CartItemModel({
                product:product._id,
                cart:cart._id,
                quantity:1,
                price:product.price,
                userId:user._id,
            })
        const createdCartItem = await CartItem.save();
        console.log("crertreteeee",createdCartItem)
        console.log(typeof(cart.cartItems))
        cart.cartItems.push(createdCartItem);
        await cart.save();
        return res.status(200).send(createdCartItem);
        }
        return res.status(400).send({
            message:"Item Not Found",
            status:false,
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = AddItemtoCart;