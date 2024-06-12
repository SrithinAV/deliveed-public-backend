import express from 'express'
import { userVerify } from '../middleware/userVerify.js';
import { placeOrder, listOrder,allOrders,orderChangeStatus,orderDelivery } from '../controllers/orderController.js';

const orderRoute = express.Router();

orderRoute.post("/place",userVerify,placeOrder);
orderRoute.post("/orders",userVerify,listOrder);
orderRoute.post("/admin/orders",allOrders);
orderRoute.post("/admin/statuschange",orderChangeStatus);
orderRoute.get("/delivery",orderDelivery);
// orderRoute.post("/delivery/status-change",orderDeliveryChangeStatus);



export default orderRoute;