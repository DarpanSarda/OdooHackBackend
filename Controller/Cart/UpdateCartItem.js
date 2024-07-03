const CartItemModel = require("../../Models/Cart/CartItemModel");
const UserModel = require("../../Models/User/UserModel");

const UpdateCartItem = async(req,res)=>{
    const userId = req.user._id;
    const cartItemId = req.params.id;
    try {
        const item = await CartItemModel.findById(cartItemId);
        if(!item)
        {
            return res.status(404).send({
                message:"Item Not Found",
                status:false
            })
        }    
        console.log("item",item)
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
            console.log(typeof(item.price))
            console.log(typeof(req.body.quantity))
            item.quantity = req.body.quantity;
            console.log(item.quantity)
            item.price = item.quantity * item.price;
            console.log(item.price)
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