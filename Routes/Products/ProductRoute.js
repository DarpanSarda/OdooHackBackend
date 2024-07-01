const express = require('express');
const authenticate = require('../../MiddleWare/Authenticate');
const AddProduct = require('../../Controller/Products/AddProduct');
const router = express.Router();

router.post("/",authenticate,AddProduct);

module.exports=router;