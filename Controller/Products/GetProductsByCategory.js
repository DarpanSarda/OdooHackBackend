const CategoryModel = require("../../Models/Category/CategoryModel");
const ProductModel = require("../../Models/Products/ProductModel");

const GetProductByCategory = async(req,res)=>{
    console.log("hello")
    try {
        const {parentcategory,category} = req.query;
        let product = []
        if(!parentcategory)
        {
            let parcat = await CategoryModel.find({name:category});
            console.log(parcat)
            product = await ProductModel.find({Category:parcat[0]._id}).populate("ParentCategory").populate("Category");
        }
        else
        {    
            let parcat = await CategoryModel.find({name:parentcategory});
            console.log(parcat)
            let chcat = await CategoryModel.find({name:category});
            console.log(chcat[0]._id)
            product = await ProductModel.find({ParentCategory:parcat[0]._id, Category:chcat[0]._id}).populate("ParentCategory").populate("Category");
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