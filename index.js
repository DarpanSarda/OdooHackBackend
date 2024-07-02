const express = require('express');
const cors = require('cors');
const {DbConnect}=require('./DBConnection/DbConnect.js')
const AuthRoute = require('./Routes/UserAuth/AuthRoute.js')
const CartRoute = require('./Routes/Cart/CartRoute.js')
const ProductRoute = require('./Routes/Products/ProductRoute.js')
const OrderRoute = require('./Routes/Orders/OrderRoute.js')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{res.send("hello")})
app.use("/api/v1/auth",AuthRoute);
app.use("/api/v1/cart",CartRoute);
app.use("/api/v1/product",ProductRoute);
app.use("/api/v1/order",OrderRoute);

app.listen(3001,async()=>{
    await DbConnect();
    console.log("server started")
})