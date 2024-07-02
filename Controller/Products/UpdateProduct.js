const ProductModel = require("../../Models/Products/ProductModel");

const UpdateProduct = async(req,res)=>{
    try {
        const updateProduct = await ProductModel.findByIdandUpdate(req.params.id,req);
        return res.status(200).send({
            updateProduct
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
    
}
module.exports = UpdateProduct;