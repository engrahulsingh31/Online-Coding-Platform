const express=require("express")
const authrouter=express.Router();
const {register,login,logout,adminregister}=require("../controllers/userauthent")
const usermiddleware=require("../middleware/usermiddleware")
const adminmiddleware=require("../middleware/adminmiddleware")

//register
authrouter.post('/register',register);
authrouter.post('/admin/register',adminmiddleware,adminregister);
//login
authrouter.post('/login',login);
//logout
authrouter.post('/logout',usermiddleware,logout);
//Getprofile
// authrouter.get('/getprofile',getprofile);

module.exports=authrouter