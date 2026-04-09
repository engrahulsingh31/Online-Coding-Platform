const express= require("express")
const submitrouter=express.Router()
const usermiddleware=require("../middleware/usermiddleware")


submitrouter.post("/submit/:id",usermiddleware,submitcode)

module.exports=submitrouter 