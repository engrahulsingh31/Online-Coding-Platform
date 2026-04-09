const {getLanguageById,submitBatch,submitToken}=require("../utils/problemUtility")
const Problem =require("../models/Problem")
const createProblem= async(req,res)=>{
    const{title,discription,difficulty,tags,visiableTestCase,hiddenTestCase,
        startcode,referenceSolution,problemcreator}=req.body
        


try{
for(const{language,completeCode} of referenceSolution){


    const languageId=getLanguageById(language);
    const submissions=visiableTestCase.map((testcase)=>({
        source_code:completeCode,
        language_id:languageId,
        stdin:testcase.input,
        expected_output:testcase.output
    }))
    const submitResult=await  submitBatch(submissions);
    console.log(submitResult)

    const resultToken = submitResult.map((value)=>value.token);

    const testresult= await submitToken(resultToken)
    console.log(testresult)

    for(const test of testresult){
        if(test.status_id!==3){
            return res.status(400).send("error occured")
        }
    }
}

userproblem=await Problem.create({
    ...req.body,
    problemcreator:req.result._id
})

// const userproblem = await Problem.create({
//   title,
//   discription,
//   difficulty,
//   tags,
//   visiableTestCase,
//   hiddenTestCase,
//   startcode,
//   referenceSolution,
//   problemcreator // 👈 pulled from req.body
// });
res.status(201).send("problem saved successfully")

}

catch(err){
    res.send("error :"+err)

} 
}

const updateProblem=async(req,res)=>{
    try{
    const {id}=req.params
 
const newproblem=await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true})
res.status(200).send(newproblem)
}

catch(err){
    res.send("error :"+err)

} 
}

const deleteProblem = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

   const deletedProblem = await Problem.findByIdAndDelete(id);

   if(!deletedProblem)
    return res.status(404).send("Problem is Missing");


   res.status(200).send("Successfully Deleted");
  }
  catch(err){
     
    res.status(500).send("Error: "+err);
  }
}
const getProblembyid=async(req,res)=>{
      const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");
    const getProblem=await Problem.findById(id);
    if(!getProblem){
        return res.status(404).send("problem is missing")
    }

    res.status(200).send(getProblem)
}
catch(err){
    res.status(500).send("Error:"+err)

}

}

const getAllproblem =async(req,res)=>{
        const getProblem=await Problem.find({}).select('_id title difficulty');
// const getProblem=await Problem.find({}).select('-title -difficulty');
        if(!getProblem){
        return res.status(404).send("problem is missing")
    }

    res.status(200).send(getProblem)

}
module.exports={createProblem,updateProblem,deleteProblem,getProblembyid, getAllproblem} 