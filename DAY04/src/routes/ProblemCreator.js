const express=require("express")
const problemrouter=express.Router();
const createProblem=require("../controllers/userProblem")
const adminmiddleware=require("../middleware/adminmiddleware")


// create
//fetch
//delete
//update

problemrouter.post('/create',adminmiddleware,createProblem)
// problemrouter.patch("/:id",problemUpdate)
// problemrouter.delete("/:id",problemDelete)

// problemrouter.get('/:id',problemFetch)
// problemrouter.get('/',getAllproblem)

// problemrouter.get("user",problemSolved)

module.exports= problemrouter