import {orderModel, orderItemModel} from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder = async (req, res)=>
{
   try 
   {
    const orderData = req.body.orderData.items;
    const user = await userModel.findById(req.body.userId);
    let cartData = user.cartData;
    cartData = {};
       
    if(user)
    {
        const order = new orderModel(
            {
                amount:req.body.orderData.amount,
                status:"Order Placed",
                payment:true,
                orderItem:req.body.orderData.orderItem,
                address:req.body.orderData.address,
                userId:req.body.userId

            }
        )

        const orderItem = new orderItemModel(
            {
                userId:req.body.userId,
                item:orderData,
                status:"Order Placed",
                address:req.body.orderData.address,

                
            }
        )
        await order.save();
         user.orders.push(order._id);
         await orderItem.save();
         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        await user.save();
        
        res.json({success:true,message:"order placed"});
        
    }
   }
   catch(error)
   {
       res.json({success:false, message:"Error"})
       console.log(error);
   }
}

const listOrder = async (req, res)=>
{
   try {
    const orderItem = await orderItemModel.find({ userId: req.body.userId }, {time:1, status:1, item: 1, _id: 0,}).lean();
    const items = orderItem.map(doc => {
        const time = doc.time;
        const status = doc.status; // Extract status from orderItem document
        const items = doc.item.map(item => ({ ...item, status, time })); // Add status to each item
        return items;
    }).flat();
    const extractedData = items.map(({ name, image, total, status, time }) => ({ name, image, total, status,time })); // extract only the data needed
      res.json({success:true, data:extractedData});
    
   } catch (error) {
     
    console.log(error)
    res.json({success:false,message:"error"});
    
   }
}

const allOrders = async (req, res)=>
{
    
    try
    {
        const orders = await orderItemModel.find({status:"Order Placed"},{time:1,status:1,item:1,_id:1}).lean();
        console.log(orders);
        res.json({success:true,data:orders})
        
    }
    catch(error)
    {
        res.json({success:false, message:"Error"});
        console.log(error);
    }
}

const orderChangeStatus = async (req,res)=>
{
    try {
        const orders = await orderItemModel.find({_id:req.headers.tocken},{status:1}).lean();
        let status = orders.status;
        status = req.body.status;
        console.log(status);
        

        

        await orderItemModel.findByIdAndUpdate(req.headers.tocken,{status});
        res.json({success:true, message:"status changed"});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
        
    }
}

const orderDelivery = async (req, res)=>
{
    try {
        const orders = await orderItemModel.find({status:"Out For Delivery"},{status:1,_id:1, address:1, item:1, time:1}).lean();
        console.log(orders);
        res.json({success:true,data:orders});
            
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

// const orderDeliveryChangeStatus = async(req, res) =>
// {
//     try {

//         await orderItemModel.findByIdAndUpdate(req.body.orderId,{status:"Delivered"})
//         res.json({success:true});
        
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"});
        
//     }
// }

export {placeOrder, listOrder,allOrders,orderChangeStatus,orderDelivery};
