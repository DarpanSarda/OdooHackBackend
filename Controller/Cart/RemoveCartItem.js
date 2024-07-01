const CartItemModel = require("../../Models/Cart/CartItemModel");
const UserModel = require("../../Models/User/UserModel");

const RemoveCartItem = async(req,res)=>{
    const user = req.user;
    try {
        const cartItem = await CartItemModel.findById(req.params).populate("products");
        if(!cartItem)
        {
            return res.status(400).send({
                message:"Item Not Found",
                success:false,
            })
        }    
        const userfind = await UserModel.findById(user._id);
        if(!userfind)
            {
                return res.status(404).send({
                    message:"User Not Found",
                    status:false
                })
            }
        if(userfind._id.toString() === cartItem.userId.toString())
        {
            await CartItemModel.findByIdAndDelete(req.params);
        }
        else
            {
                return res.status(404).send({
                    message:"Not Found",
                    status:false
                })
            }
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = RemoveCartItem;