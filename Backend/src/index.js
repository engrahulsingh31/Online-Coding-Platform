const express=require("express")
require("dotenv").config()
const main=require("./config/db")
const cookieparser =require("cookie-parser")
const authrouter=require("./routes/userauth")
const redisClient = require("./config/redis")
const problemrouter=require("./routes/ProblemCreator")
const submitrouter = require("./routes/submit")
const airouter=require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors =require('cors')



const app=express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use(express.json())
app.use(cookieparser())
app.use('/user',authrouter)
app.use('/problem',problemrouter)
app.use('/submission',submitrouter)
app.use('/ai',airouter)
app.use("/video",videoRouter);


const intializeconnection=async()=>{
    try{
       await Promise.all([main(),redisClient.connect()])
        console.log("db connected")
          app.listen(process.env.PORT,()=>{
    console.log("Server listening at port Number :"+process.env.PORT)
})
        

    }
    catch(err){
        console.log("error:"+err)

    }
}
intializeconnection()
// main()
// .then(async ()=>{
//     app.listen(process.env.PORT,()=>{
//     console.log("Server listening at port Number :"+process.env.PORT)
// })

// })
// .catch(err=>console.log("error occured :"+err ))



// 