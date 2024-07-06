const CategoryModel = require("../../Models/Category/CategoryModel");
const ProductModel = require("../../Models/Products/ProductModel");

const AddProduct = async(req,res)=>{
    let{Name,description,price,quantity,brand,renter,ParentCategory,Category,color,dimension} = req.body;
    let{image1}=req.body.Image;
    let{image2}=req.body.Image;
    let{image3}=req.body.Image;
    let{image4}=req.body.Image;
    console.log(dimension)
    try {
        let parcat = await CategoryModel.findOne({name:ParentCategory});
        console.log(parcat)
        if(!parcat)
        {
            parcat = new CategoryModel({
                name:ParentCategory,
                level:'parent',
            })
            await parcat.save();
        }
        console.log(parcat)
        let chcat = await CategoryModel.findOne({name:Category})
        if(!chcat)
        {
            chcat = new CategoryModel({
                name:Category,
                level:'child',
            })
            await chcat.save();
        }
        console.log(chcat)
        const Product = new ProductModel({
            Name:Name,
            description:description,
            price:price,
            quantity:quantity,
            brand:brand,
            renter:renter,
            Image:
                {
                    image1:image1,
                    image2:image2,
                    image3:image3,
                    image4:image4,
                },
            color:color,
            Dimensions:dimension,
            ParentCategory:parcat._id,
            Category:chcat._id,
        })
        console.log(Product.Image)
        Product.save();
        return res.status(200).send({
            Product,
            success:true,
        })
    } catch (error) {
        
    }
}

module.exports = AddProduct;