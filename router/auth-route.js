const router = require('express').Router()
const signup_DB = require('../models/auth_Sign_up');
const users_data = require('../models/user-model')
const JWT = require('jsonwebtoken')




router.post("/sign-up", async (req, res) => {
    try {
        // const email = req.body.email
        // const password = req.body.password
        // const name = req.body.name
  const {email , password , name } = req.body
        const userExist = await signup_DB.findOne({ email })
        if (userExist) {
            return res.status(400).json({ msg: "user already Exist ...please Login" });
        }
        var user = new signup_DB({ email: email, password: password, name: name })
        const result = await user.save();
        console.log(result);

        return res.status(200).send(result);
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
        console.log(user.password);
        if (!user) {
            return res.status(400).json({
                msg: "invalid cradintial"
            })
        }
        if(user.password !== password){
            return res.status(400).json({
                msg: "invalid cradintial"
            })
        }
        const token = await JWT.sign({role :"admin"},"dfdjdfdffdlfdo" ,{expiresIn:39399})
        res.status(200).json({token})
    } catch (error) {
        return res.status(400).json({ msg: "something went Wrong" })
        // this is s1 branch
    }
})





module.exports = router