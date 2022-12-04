const mongoose = require('mongoose')
const  exoenseSchema = new mongoose.Schema({
    date:{
        type:Date,
        require:[true , "head is Required Feild"]
       
      },
    head:{
        type:String,
        require:[true , "head is Required Feild"],
        trim: true,
        lowercase: true
      },
    amount:{
        type:Number,
        require:[true , "Amount is Required Feild"],
        
      },
    paid_to:{
        type:String,
        require:[true , "Paid_to is Required Feild"],
        trim: true,
        lowercase: true
      },
    username:{
        type:String,
        require:[true , "username is Required Feild"],
        trim: true,
        lowercase: true
      },
    approved:{
        type:Boolean,
        require:[true , "approve is Required Feild"],
        default:false
      },

    // { date : '3 Apr 19', head : 'Food', amount : 10, paid_to : 'Wada Pav Wala', username : 'shubham', approved:true },
  
},{versionKey:false})


module.exports= mongoose.model('expense' , exoenseSchema)