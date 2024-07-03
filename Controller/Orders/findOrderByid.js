const OrderModel = require("../../Models/Order/OrderModel");

const findOrderByid = async(req,res)=>{
    try {
        const order = await OrderModel.findById(req.params.id).populate('user').populate({path: "orderItems", populate:{path:'products'}}).populate('shippingAddress');
        
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = findOrderByid;