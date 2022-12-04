const express = require('express')
const mongoose = require('mongoose')
const router = require('./router/user-route')
const authRouter = require('./router/auth-route')
const expenese = require('./router/expense-route')
const body_parser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
const URL = 'mongodb://127.0.0.1/user-management'
app.use(body_parser.json())
app.use('/user' , router)
app.use('/api' , authRouter)
app.use('/exp' , expenese)

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