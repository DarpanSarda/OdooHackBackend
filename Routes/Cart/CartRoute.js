const express = require('express');
const findUserCartController = require('../../Controller/Cart/findUserCartController');
const authenticate = require('../../MiddleWare/Authenticate');
const AddItemtoCart = require('../../Controller/Cart/AddItemtoCart');
const UpdateCartItem = require('../../Controller/Cart/UpdateCartItem');
const RemoveCartItem = require('../../Controller/Cart/RemoveCartItem');
const router = express.Router();

router.get("/",authenticate,findUserCartController);
router.put("/add",authenticate,AddItemtoCart);
router.put("/cartitem/:id",authenticate,UpdateCartItem);
router.delete("/cartitem/:id",authenticate,RemoveCartItem);
module.exports = router;