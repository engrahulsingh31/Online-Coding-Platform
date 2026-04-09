const express=require("express")
const authrouter=express.Router();
const {register,login,logout,adminRegister,deleteProfile}=require("../controllers/userauthent")
const usermiddleware=require("../middleware/usermiddleware")
const adminmiddleware=require("../middleware/adminmiddleware")

//register
authrouter.post('/register',register);
authrouter.post('/admin/register',adminmiddleware,adminRegister);
//login
authrouter.post('/login',login);
//logout
authrouter.post('/logout',usermiddleware,logout);

//Getprofile
// authrouter.get('/getprofile',getprofile);
authrouter.delete('/deleteprofile',usermiddleware,deleteProfile)

authrouter.get("/check",usermiddleware,(req,res)=>{
    const reply ={
        firstName:req.result.firstName,
        emailId:req.result.emailId,
        _id:req.result._id,
        role: req.result.role

    }
    res.status(200).json({
        user:reply,
        message:"valid User"
    })
})

module.exports=authrouter