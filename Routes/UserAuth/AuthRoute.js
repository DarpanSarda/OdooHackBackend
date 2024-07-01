const express = require('express');
const LoginController = require('../../Controller/Auth/LoginController');
const SignupController = require('../../Controller/Auth/SignupController');
const router = express.Router();


router.post("/login",LoginController);
router.post("/signup",SignupController);
module.exports = router;