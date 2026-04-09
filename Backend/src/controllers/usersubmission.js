const Problem=require("../models/Problem")
const Submission =require("../models/submission")
const {getLanguageById,submitBatch,submitToken}=require("../utils/problemUtility")

const submitcode=async(req,res)=>{
    try{
       const userId=req.result._id
       const problemId=req.params.id

       const{code,language}=req.body;

       if(!userId||!problemId||!code||!language){
        return res.status(400).send("Some field Missing")
       }
       if(language==='cpp')
        language='c++'
      const problem=await  Problem.findById(problemId)

      const submittedresult=await Submission.create({
        language,
        userId,
        code,
        problemId,
        status:"pending",
        testCasesTotal:problem.hiddenTestCase.length
      })

       const languageId=getLanguageById(language);
        const submissions=problem.hiddenTestCase.map((testcase)=>({
        source_code:code,
        language_id:languageId,
        stdin:testcase.input,
        expected_output:testcase.output
    }))
       const submitResult=await  submitBatch(submissions);


    const resultToken = submitResult.map((value)=>value.token);

    const testresult= await submitToken(resultToken)
     // submittedResult ko update karo
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;


    for(const test of testresult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = 'error'
            errorMessage = test.stderr
          }
          else{
            status = 'wrong'
            errorMessage = test.stderr
          }
        }
    }


    // Store the result in Database in Submission
    submittedresult.status   = status;
    submittedresult.testCasesPassed = testCasesPassed;
    submittedresult.errorMessage = errorMessage;
    submittedresult.runtime = runtime;
    submittedresult.memory = memory;

    await submittedresult.save();
    // problemId ko insert krenge userschema ke problemsolved mai if it is not present there
  if(!req.result. problemSolved.includes(problemId)){
    req.result.problemSolved.push(problemId)
    await req.result.save()
  }
   const accepted = (status == 'accepted')
    res.status(201).json({
      accepted,
      totalTestCases: submittedresult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory
    });
       
    }
    catch(err){
        res.status(500).send("Internal Server Error"+err)

    }
}
const runcode=async(req,res)=>{
    try{
       const userId=req.result._id
       const problemId=req.params.id

       const{code,language}=req.body;

       if(!userId||!problemId||!code||!language){
        return res.status(400).send("Some field Missing")
       }
      const problem=await  Problem.findById(problemId)

       const languageId=getLanguageById(language);
        const submissions=problem.visiableTestCase.map((testcase)=>({
        source_code:code,
        language_id:languageId,
        stdin:testcase.input,
        expected_output:testcase.output
    }))
       const submitResult=await  submitBatch(submissions);


    const resultToken = submitResult.map((value)=>value.token);

    const testresult= await submitToken(resultToken)
  
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for(const test of testresult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = false
            errorMessage = test.stderr
          }
          else{
            status = false
            errorMessage = test.stderr
          }
        }
    }

   
  
   res.status(201).json({
    success:status,
    testCases: testresult,
    runtime,
    memory
   });
      
   }
    catch(err){
        res.status(500).send("Internal Server Error"+err)

    }
}
module.exports={submitcode,runcode}