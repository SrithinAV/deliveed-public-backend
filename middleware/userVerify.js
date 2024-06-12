import jwt from 'jsonwebtoken';
import express from 'express';


const userVerify = async(req, res, next)=>
{
    const {tocken} = req.headers;
    

    if(!tocken)
    {
       return res.json({success:false, message:"Authorization failed"});
    }

    else
    {
        try {
            const decode = await jwt.verify(tocken,process.env.JWT_SECRET);
            req.body.userId = decode.id;
            next();

            
        } catch (error) {
            console.log(error);

            return res.json({success:false, message:"error"});

            
        }
        
    }
  
}

export {userVerify};