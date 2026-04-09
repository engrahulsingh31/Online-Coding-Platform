const express=require("express")
const airouter=express.Router();
const usermiddleware=require("../middleware/usermiddleware")
const solveDoubt =require("../controllers/solveDoubt")

airouter.post('/chat',usermiddleware,solveDoubt)

module.exports= airouter;
