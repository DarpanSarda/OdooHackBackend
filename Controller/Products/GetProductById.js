const ProductModel = require("../../Models/Products/ProductModel");

const GetProductById = async(req,res)=>{
    const productId = req.params.id;
    try {
        console.log(productId)
        const product = await ProductModel.findById(productId);
        console.log(product)
        if(!product)
        {
            return res.status(404).send({
                success:false,
                message:"Product Not Found",
            })
        }
        return res.status(200).send({
            success:true,
            product
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = GetProductById;