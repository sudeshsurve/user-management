const router = require('express').Router()
const usermodule = require('../models/user-model')



router.post('/user_post' , async(req , res)=>{
try {
  const {name , email  , role , age ,city} = req.body
     let userdata =  new usermodule({name:name , email:email  , role:role , age:age ,city:city})
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