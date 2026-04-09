const express=require("express")
require("dotenv").config()
const main=require("./config/db")
const cookieparser =require("cookie-parser")
const authrouter=require("./routes/userauth")

const app=express();
app.use(express.json())
app.use(cookieparser())
app.use('/user',authrouter)


main()
.then(async ()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Server listening at port Number :"+process.env. PORT)
})

})
.catch(err=>console.log("error occured :"+err ))



