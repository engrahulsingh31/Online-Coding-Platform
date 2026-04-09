const validator=require("validator")
const validate=(data)=>{
    const mandatoryfield=['firstName',"emailId",'password']
    isAllowed=mandatoryfield.every((k)=>Object.keys(data).includes(k));
    if(!isAllowed)
        throw new Error("some field missing")

    if(!validator.isEmail(data.emailId))
        throw new Error ("Invalid Email")
    if(!validator.isStrongPassword(data.password))
        throw new Error("week password")


}
module.exports=validate