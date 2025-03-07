const express = require('express');
const authenticate = require('../../MiddleWare/Authenticate');
const AddProduct = require('../../Controller/Products/AddProduct');
const UpdateProduct = require('../../Controller/Products/UpdateProduct');
const DeleteProduct = require('../../Controller/Products/DeleteProduct');
const GetProductById = require('../../Controller/Products/GetProductById');
const GetAllProducts = require('../../Controller/Products/GetAllProducts');
const GetProductByCategory = require('../../Controller/Products/GetProductsByCategory');
const router = express.Router();

router.post("/",authenticate,AddProduct);
router.put("/:id",authenticate,UpdateProduct);
router.delete("/:id",authenticate,DeleteProduct);
router.get("/:id",authenticate,GetProductById);
router.get("/",authenticate,GetAllProducts);
router.get("/category/search",authenticate,GetProductByCategory);

module.exports=router;