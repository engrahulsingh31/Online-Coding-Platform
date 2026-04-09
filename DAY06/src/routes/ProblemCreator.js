const express=require("express")
const problemrouter=express.Router();
const {createProblem,updateProblem,deleteProblem,getProblembyid, getAllproblem}=require("../controllers/userProblem")
const adminmiddleware=require("../middleware/adminmiddleware")
const usermiddleware=require("../middleware/usermiddleware")



// create
//fetch
//delete
//update

problemrouter.post('/create',adminmiddleware,createProblem)
problemrouter.put("/update/:id",adminmiddleware,updateProblem)
problemrouter.delete("/delete/:id",adminmiddleware,deleteProblem)

problemrouter.get('/getProblembyid/:id',usermiddleware,getProblembyid)
problemrouter.get('/getAllproblem',usermiddleware,getAllproblem)

// problemrouter.get("user",problemSolved)

module.exports= problemrouter