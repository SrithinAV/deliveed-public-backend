import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { toast } from "react-toastify";

//login

const loginUser = async (req, res)=>
{
  const {email, password} = req.body;
 
  
  try
  {
    const user = await userModel.findOne({email});
    if(!user)
    {
      
        return res.json({success:false, message:"User does not exist"});

    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {
        
        return res.json({success:false, message:"Invalid credentials"});

    }
    
    const tocken = createTocken(user._id);
    res.json({success:true,tocken});


  }
  catch(error)
  {
    console.log(error);
    res.json({success:false,message:"error"});
  }
}
//create tocken

const createTocken = (id) =>
{
    return jwt.sign({id},process.env.JWT_SECRET)

}


//register

const registerUser = async (req,res)=>
{
    const {name, password, email} = req.body;
    
    
    try {
        // is already exists?
        const exists = await userModel.findOne({email});
        
        if(exists)
        {
            return res.json({success:false, message:"User already exists"});
        }

        //validate email format and strong password

        if(!validator.isEmail(email))
        {
            return res.json({success:false, message:"Please enter valid email"});

        }
        if(password.length<8)
        {
            return res.json({success:false, message:"Please enter a strong password"});

        }

        // hashing password
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel(
            {
                name:name,
                email:email,
                password:hashedPassword,


            }
        )

        const user = await newUser.save()
        const tocken  = createTocken(user._id);
        res.json({success:true,tocken, message:"Success"})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
        
    }

}
export{loginUser, registerUser}