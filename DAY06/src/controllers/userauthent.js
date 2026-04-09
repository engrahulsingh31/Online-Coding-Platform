const redisClient = require("../config/redis")
const User= require("../models/user")
const validate=require("../utils/validator")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")

const register=async (req,res)=>{
    try{ 
      validate(req.body)
  const {firstName,emailId,password}=req.body
  req.body.password=await bcrypt.hash(password,10)
  req.body.role='user'

  const user=await User.create(req.body)
  const token =jwt.sign({_id:user._id,emailId:emailId,role:"user"},process.env.JWT_KEY,{expiresIn:3600})
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

     const token =jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:3600})
  res.cookie("token",token,{maxAge:3600*1000})
  res.status(201).send("login succesfully")

  }
  catch(err){
       res.status().send("Error:"+err)
  }
}

const logout=async(req,res)=>{
  try{
    const {token}=req.cookies
    const payload=jwt.decode(token);
    await redisClient.set(`token:${token}`,'blocked')
    await redisClient.expireAt(`token:${token}`,payload.exp)
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.send("logout succesfully")

  }
  catch(err){
    res.status(503).send("error:"+err)
    
  }
}
const adminregister=async (req,res)=>{
    try{ 
    //   if(req.result.role!='admin'){
    //     throw new Error("invalid credential")
    //   }
      validate(req.body)

  const {firstName,emailId,password}=req.body
  req.body.password=await bcrypt.hash(password,10)
  req.body.role='admin'

  const user=await User.create(req.body)
  const token =jwt.sign({_id:user._id,emailId:emailId,role:"admin"},process.env.JWT_KEY,{expiresIn:3600})
  res.cookie("token",token,{maxAge:3600*1000})
  res.status(200).send("user Register succesfully")
    }
    catch(err){
           res.status(400).send("error"+err )
    }
}

module.exports={register,login,logout,adminregister}