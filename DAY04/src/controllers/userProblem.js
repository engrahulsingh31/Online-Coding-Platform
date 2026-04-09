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
module.exports=createProblem