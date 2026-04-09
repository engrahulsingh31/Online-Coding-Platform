const express=require("express")
const problemrouter=express.Router();
const {createProblem,updateProblem,deleteProblem,getProblembyid, getAllproblem,problemSolvedbyuser,submittedProblem}=require("../controllers/userProblem")
const adminmiddleware=require("../middleware/adminmiddleware")
const usermiddleware=require("../middleware/usermiddleware")



// create
//fetch
//delete
//update

problemrouter.post('/create',adminmiddleware,createProblem)
problemrouter.put("/update/:id",adminmiddleware,updateProblem)
problemrouter.delete("/delete/:id",adminmiddleware,deleteProblem)

problemrouter.get('/problemById/:id',usermiddleware,getProblembyid)
problemrouter.get('/getAllproblem',usermiddleware,getAllproblem)

problemrouter.get("/problemSolvedbyuser",usermiddleware,problemSolvedbyuser)
problemrouter.get("/submittedProblem/:pid",usermiddleware,submittedProblem)
 
module.exports= problemrouter