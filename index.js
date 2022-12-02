const express = require('express')
const mongoose = require('mongoose')
const router = require('./router/user-route')
const authRouter = require('./router/auth-route')
const body_parser = require('body-parser')
const app = express()
const URL = 'mongodb://127.0.0.1/admin'
app.use(body_parser.json())
app.use('/user' , router)
app.use('/api' , authRouter)

mongoose.connect(URL ,(err)=>{
    if(err){
        console.log(`unabel to connect ${err}`);
    }else{
        console.log(`server connected`)
    }
})

const port = 3000
app.listen(port ,()=>{
    console.log(`listen on ${port}`);
})