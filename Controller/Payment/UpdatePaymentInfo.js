const OrderModel = require('../../Models/Order/OrderModel');
const razorpay = require('../../RazorPayClient');

const UpdatePaymentInfo = async(req,res)=>{
    const paymentId = req.quer.payment._id;
    const orderId = req.query.order._id;
    try {
        const order = OrderModel.findById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == 'captured')
        {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status="COMPLETED";
            order.orderStatus="Placed";

            await order.save();
        }
        const resData={
            message:"Your Order is Placed",
            success:true,
        }
        return res.status(200).send({
            message:"Payment Status Updated",
            success:true
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = UpdatePaymentInfo;