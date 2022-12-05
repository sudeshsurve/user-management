const router = require('express').Router()
const signup_DB = require('../models/auth_Sign_up');
const users_data = require('../models/user-model')
const JWT = require('jsonwebtoken')




router.post("/sign-up", async (req, res) => {
    try {
  const {email , password , name } = req.body
        const userExist = await signup_DB.findOne({ email })
        if (userExist) {
            return res.status(400).json({ msg: "user already Exist ...please Login" });
        }
        var user = new signup_DB({ email: email, password: password, name: name })
        const result = await user.save();
        console.log(result);
         res.status(200).send(result);
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
});


router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await users_data.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "invalid cradintial"
            })
        }
        if(user.password !== password){
            return res.status(400).json({
                msg: "invalid cradintial"
                // this is s2 commit
                // test1 branch 
            })
        }
        console.log(user._id.toString());
        const token = await JWT.sign({role :user.role, username : user.username , userID :user._id.toString()},"dfdjdfdffdlfdo" ,{expiresIn:39399})
        res.status(200).json({token})
    } catch (error) {
        return res.status(400).json({ msg: "something went Wrong" })
        // this is s1 branch
    }
})





module.exports = router