const router = require('express').Router()
const usermodule = require('../models/user-model')



router.post('/user_post' , async(req , res)=>{
try {
  const {username , email , password , role , city , age } = req.body
    const userExist = await usermodule.findOne({email:email})
   if(userExist){
      return res.status(400).json({message:"user is already exist"})
   }
     let userdata =  new usermodule({username:username , email:email , password:password , role:role , age:age , city:city})
     const result = await userdata.save()
     console.log(result);
     res.status(200).json(result)

} catch (error) {
  if (error.name === "ValidationError") {
    let errors = {};
    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });
    return res.status(400).send(errors);
}
res.status(500).send("Something went wrong");
}
})
module.exports = router