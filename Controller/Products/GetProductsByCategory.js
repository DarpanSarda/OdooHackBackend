const ProductModel = require("../../Models/Products/ProductModel");

const GetProductByCategory = async(req,res)=>{
    console.log("hello")
    try {
        const {parentcategory,category} = req.query;
        let product = []
        if(!parentcategory)
        {
            product = await ProductModel.find({Category:category});
        }
        else
        {    
            product = await ProductModel.find({ParentCategory:parentcategory, Category:category});
        }
        console.log("cattt",product)
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

module.exports = GetProductByCategory;