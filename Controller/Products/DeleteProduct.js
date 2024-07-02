const ProductModel = require("../../Models/Products/ProductModel")

const DeleteProduct = async(req,res)=>{
    try {
        await ProductModel.findByIdandDelete(req.params.id);
        return res.status(200).send({message:"Deleted Product", success:true})
    } catch (error) {
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

module.exports = DeleteProduct;