const axios=require("axios")


const getLanguageById=(lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];
}
const submitBatch=async(submissions)=>{

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': 'c2ddb05568msh19f992df5deb956p1842d1jsn63f58f34df1d',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};
async function fatchdata() {
    

try {
	const response = await axios.request(options);
	return (response.data);
} catch (error) {
	console.error(error);
}
}
return await fatchdata()


}

const waiting=async(timer)=>{
  setTimeout(()=>{
    return 1;
  },timer)
}

const submitToken=async(resulttoken)=>{
  const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resulttoken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'c2ddb05568msh19f992df5deb956p1842d1jsn63f58f34df1d',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return (response.data);
	} catch (error) {
		console.error(error);
	}
}
while(true){
const result= await  fetchData();
const isresultobtained= result.submissions.every((r)=>r.status.id>2)
if(isresultobtained)
  return result.submissions
await waiting(1000)

}

}

module.exports={getLanguageById,submitBatch,submitToken}
