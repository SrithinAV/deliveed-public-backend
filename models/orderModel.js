import mongoose from 'mongoose'

const  orderSchema = new mongoose.Schema(
    { 
        amount:{type:Number, required:true},
        status:{type:String},
        payment:{type:Boolean,default:false},
        orderItem:{type:Object, required:true},
        address:{type:Object, default:{}},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
        

    }
)

const orderItemSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
        item:{type:[Object],default:[{}]},
        time:{type:Date, default: Date.now},
        status:{type:String},
        address:{type:Object, default:{}},
        


    }
)


const orderModel = mongoose.model.orders || mongoose.model("order",orderSchema);
const orderItemModel = mongoose.model.orderItem || mongoose.model("orderItem",orderItemSchema);


export  {orderModel,orderItemModel };