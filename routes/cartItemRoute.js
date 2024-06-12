import express from 'express'
import { userVerify } from '../middleware/userVerify.js';
import { addCart, removeCart, getCart } from '../controllers/cartItemController.js';
const cartItemRoute = express.Router();


cartItemRoute.post("/add",userVerify,addCart);
cartItemRoute.post("/remove",userVerify,removeCart);
cartItemRoute.post("/get",userVerify,getCart);

export default cartItemRoute;