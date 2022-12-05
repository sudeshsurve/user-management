const router = require('express').Router()
const usermodule = require('../models/user-model')
router.post('/user_post' , async(req , res)=>{
try {
  const {username , email , password , role , city , age , gender} = req.body
    const userExist = await usermodule.findOne({email:email})
    const usernameExist = await usermodule.findOne({username : username})
    // console.log(userExist);
   if(userExist || usernameExist){
      return res.status(400).json({message:"user is already exist"})
   }
      
     let userdata =  new usermodule({username:username , email:email , password:password , role:role , age:age , city:city , gender:gender})
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

router.get('/all-user' , async(req , res)=>{
  try {
    const result = await usermodule.find()
  res.json(result)
  } catch (error) {
    
    res.status(400).json('something went wrong')
  }
})

module.exports = router