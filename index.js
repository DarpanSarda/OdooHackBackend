const express = require('express');
const cors = require('cors');
const {DbConnect}=require('./DBConnection/DbConnect.js')
const AuthRoute = require('./Routes/UserAuth/AuthRoute.js')
const CartRoute = require('./Routes/Cart/CartRoute.js')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{res.send("hello")})
app.use("/api/v1/auth",AuthRoute);
app.use("/api/v1/cart",CartRoute);


app.listen(3001,async()=>{
    await DbConnect();
    console.log("server started")
})