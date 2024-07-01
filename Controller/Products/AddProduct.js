const ProductModel = require("../../Models/Products/ProductModel");

const AddProduct = async(req,res)=>{
    let{Name,description,price,quantity,brand,renter,parentCategory,category,color,dimension} = req.body;
    let{image1}=req.body.Image;
    let{image2}=req.body.Image;
    let{image3}=req.body.Image;
    let{image4}=req.body.Image;
    
    try {
        console.log(req.body.Image[1])
        console.log(image1,image2)
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
            ParentCategory:parentCategory,
            Category:category,
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