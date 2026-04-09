const mongoose=require("mongoose")
const {Schema}=mongoose

const problemschema= new Schema({
    title:{
        type:String,
        required:true
    },
    descriptiom:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['easy','medium','hard'],
         required:true
    },
    tags:{
        type:String,
        enum:['Array',"Linkedlist","Stack","Graph","DP"]
    },
    visiableTestCase:{
       input:{
        type:String,
        required:true,

       },
       output:{
        type:String,
        required:true
       },
       explanation:{
        type:String,
        required:true
       }

    },
      hiddenTestCase:{
       input:{
        type:String,
        required:true,

       },
       output:{
        type:String,
        required:true
       }

    },
    startcode:{
        language:{
            type:String,
            required:true

        },
        initialcode:{
            type:String,
            required:true
        }

    },
    problemcreator:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

})
const Problem=mongoose.model("problem",problemschema)
module.exports=Problem