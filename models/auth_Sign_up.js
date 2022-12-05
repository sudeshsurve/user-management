
const mongoose = require('mongoose')
const validator = require('validator')
const Sign_up_Schema = new mongoose.Schema({
      username: {
            type: String,
            requried: [true, "Name is required filed"],
            unique : true ,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email is a required field"],
            trim: true,
            lowercase: true,
            validate(value) {
                  if (!validator.isEmail(value)) {
                    throw new Error("Please enter a valid E-mail!");
                  }
                },
         
        },
        password: {
            type: String,
            required: [true, "Password is a required field"],
            trim: true,
            validate(value) {
              if (!validator.isLength(value, { min: 6, max: 1000 })) {
                throw Error("Length of the password should be between 6-1000");
              }
      
              if (value.toLowerCase().includes("password")) {
                throw Error(
                  'The password should not contain the keyword "password"!'
                );
              }
            },
          },
        }, { versionKey: false }
)
module.exports = mongoose.model("sign-up" ,Sign_up_Schema)