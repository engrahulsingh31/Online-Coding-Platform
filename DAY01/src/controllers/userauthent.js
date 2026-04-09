const User= require("../models/user")
const validate=require("../utils/validator")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")

const register=async (req,res)=>{
    try{ 
      validate(req.body)
  const {firstName,emailId,password}=req.body
  req.body.password=await bcrypt.hash(password,10)

  const user=await User.create(req.body)
  const token =jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:3600})
  res.cookie("token",token,{maxAge:3600*1000})
  res.status(200).send("user Register succesfully")
    }
    catch(err){
           res.status(400).send("error"+err )
    }
}

const login=async(req,res)=>{
  try{
    const{emailId,password}=req.body
    if(!emailId)
      throw new Error("Invalid Credential")
    if(!password)
      throw new Error("invalid credential")
    const user=await User.findOne({emailId})
    const match=bcrypt.compare(password,req.body.password)
    if(!match)
      throw new Error("invalid credentials")

     const token =jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:3600})
  res.cookie("token",token,{maxAge:3600*1000})
  res.status(201).send("login succesfully")

  }
  catch(err){
       res.status().send("Error:"+err)
  }
}