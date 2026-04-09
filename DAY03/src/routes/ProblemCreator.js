const express=require("express")
const problemrouter=express.Router();
const problemrouter=require("../middleware/adminmiddleware")


// create
//fetch
//delete
//update

problemrouter.post('/create',createProblem)
problemrouter.patch("/:id",updateProblem)
problemrouter.delete("/:id",deleteProblem)

problemrouter.get('/:id',problemFetch)
problemrouter.get('/',getAllproblem)

problemrouter.get("user",problemSolved)
