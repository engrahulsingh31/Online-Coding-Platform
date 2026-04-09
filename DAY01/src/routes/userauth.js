const express=require("express")
const authrouter=express.Router();

//register
authrouter.post('/register',register);
//login
authrouter.post('/login',login);
//logout
authrouter.post('/logout',logout);
//Getprofile
authrouter.get('/getprofile',getprofile);