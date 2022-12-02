const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        requried: [true, "Name is required"]
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
        }
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
    role: {
        type: String,
        required: [true, "role is a required field"],
        trim: true,
        lowercase: true
    },
    city: {
        type: String,
        required: [true, "city is a required field"],
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: [true, "Age is a required field"],
    },
}, { versionKey: false })
module.exports = mongoose.model("user", userSchema)
