const jwtProvider = require('../../JWT/jwtProvider');
const bcrypt = require('bcrypt');
const UserModel = require('../../Models/User/UserModel');
const CartModel = require('../../Models/Cart/CartModel');

const SignupController = async(req,res)=>{
    try {
        let{firstName,lastName,email,password} = req.body;
        const userexist = await UserModel.findOne({email:email});
    
        if(userexist)
        {
            return res.status(400).send({
                success:false,
                message:"User already exist",
            })
        }
        password = await bcrypt.hash(password,8);
        const user = await UserModel.create({firstName,lastName,email,password});
        console.log(user)
        const jwt = jwtProvider.generateToken(user._id);

        const cart = new CartModel({user});
        const createdCart = cart.save();

        return  res.status(200).send({
            jwt,
            message:"User Created Success",
            success:true
        })

    } catch (error) {
        return res.status(500).send({
            message:error.message,
            success:false
        })
    }
}

module.exports = SignupController;