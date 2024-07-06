const express = require('express');
const router = express.Router();
const authenticate = require('../../MiddleWare/Authenticate');
const CreatePaymentLink = require('../../Controller/Payment/CreatePaymentLink');
const UpdatePaymentInfo = require('../../Controller/Payment/UpdatePaymentInfo');

router.post("/:id",authenticate,CreatePaymentLink);
router.get("/",authenticate,UpdatePaymentInfo);

module.exports = router;