import express from 'express'
import userModel from "../models/userModel.js";


const addCart = async (req, res)=>
{
    try
    {
    const user =  await userModel.findById(req.body.userId);
    
    let cartData = user.cartData;

        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else
        {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"item added"});

}
catch(error)
{
    console.log(error);
    res.json({success:false, message:"Error adding item to cart"});
}




}

const removeCart = async(req, res)=>
{
   try
   {
    const user = await userModel.findById(req.body.userId);
    let cartData = user.cartData;
   
    if(cartData[req.body.itemId]>0)
    {
       cartData[req.body.itemId] -= 1;
       await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    }

   
    res.json({success:true, message:"removed item"});


   }
   catch(error)
   {
    console.log(error)
    res.json({success:false, message:"Error"});

   }

}

const getCart = async(req,res)=>
{
    try {
        const user = await userModel.findById(req.body.userId);
        let cartData = user.cartData;
    
        res.json({success:true, cartData});

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error at get"});
        
    }

}

export{addCart, getCart, removeCart};