const express = require('express')
const router = express.Router();
const authenticate = require('../../MiddleWare/Authenticate');
const findOrderByid = require('../../Controller/Orders/findOrderByid');
const CreateOrder = require('../../Controller/Orders/CreateOrder');
const OrderHistory = require('../../Controller/Orders/OrderHistory');


router.get("/:id",authenticate,findOrderByid);
router.post("/",authenticate,CreateOrder);
router.get("/orders/yourorders",authenticate,OrderHistory);

module.exports = router;