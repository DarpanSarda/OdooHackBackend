const OrderModel = require("../../Models/Order/OrderModel")

const OrderHistory = async (req,res)=>{
    const user = req.user;
    try {
        let orders = await OrderModel.find({
            user:user,
            orderStatus : "Placed",
        }).populate({path:"orderItems",populate:{path:"products"}}).lean();
        
        return res.status(200).send(orders);

    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = OrderHistory;