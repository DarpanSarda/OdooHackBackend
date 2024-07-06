const OrderModel = require("../../Models/Order/OrderModel");
const razorpay = require("../../RazorPayClient");

const CreatePaymentLink = async(req,res) => {
    const orderId = req.params.id;
    const user = req.user;
    console.log(orderId)
    try {
        const order = await OrderModel.findById(orderId).populate('user');
        console.log(order)
        const paymentLinkRequest = {
            amount: order.totalPrice*100,
            currency:"INR",
            customer:{
                name:order.user.firstName,
                contact:user.mobile,
                email:order.user.email,
            },
            notify:{
                sms:true,
                email:true
            },
            reminder_enable:true,
            callback_url:`http://localhost:3001`,
            callback_method:'get',
        };
        console.log(paymentLinkRequest)
        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        const paymentLinkId = paymentLink.id;
        const paymentLinkUrl = paymentLink.short_url;

        const responseData={
            paymentLinkId,
            paymentLinkUrl
        }
        return res.status(200).send(responseData);
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        }) 
    }   
}

module.exports = CreatePaymentLink;