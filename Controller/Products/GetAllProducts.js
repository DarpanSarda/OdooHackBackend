const ProductModel = require("../../Models/Products/ProductModel")

const GetAllProducts = async(req,res)=>{
    try {
        const products = await ProductModel.find();
        if(!products)
        {
            return res.status(404).send({
                success:false,
                message:"No Products Found"
            })
        }
        return res.status(200).send({
            products
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = GetAllProducts;