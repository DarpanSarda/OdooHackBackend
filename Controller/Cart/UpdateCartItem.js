const CartItemModel = require("../../Models/Cart/CartItemModel");
const UserModel = require("../../Models/User/UserModel");

const UpdateCartItem = async(req,res)=>{
    const userId = req.user._id;
    const cartItemId = req.params.id;
    try {
        const item = await CartItemModel.findById(cartItemId).populate('products');
        if(!item)
        {
            return res.status(404).send({
                message:"Item Not Found",
                status:false
            })
        }    
        const user = await UserModel.findById(item.userId)
        if(!user)
        {
            return res.status(404).send({
                message:"User Not Found",
                status:false
            })
        }
        if(user._id.toString() === item.userId.toString())
        {
            item.quantity = req.body.quantity;
            item.price = item.quantity * item.product.price;
            const updatedcartItem = await item.save();
            return res.status(200).send(updatedcartItem);
        }    
        return res.status(404).send({
            message:"Some Error occured",
            status:false,
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = UpdateCartItem;