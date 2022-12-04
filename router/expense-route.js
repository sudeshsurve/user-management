const expense = require('express').Router()
const exp = require('../models/expenses_model')
const JWT = require('jsonwebtoken')
const  mongoose = require('mongoose')

expense.post('/expenses', async (req, res) => {
    try {
        const { date, username, head, amount, paid_to, approved  } = req.body
        const expense = new exp({ username: username, head: head, amount: amount, paid_to: paid_to, approved: approved, date: date })
        const exp_data = await expense.save()
        res.status(200).json({
            message: "success"
        })
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

expense.get('/user-expense', async (req, res) => {
    try {
        const token = req.header('auth')
        const data = token.split(' ')[1]
        const token_data = await JWT.verify(data, "dfdjdfdffdlfdo")
        console.log(token_data);
        const result = await exp.find({ username: token_data.username })
        const approved = result.filter((x) => x.approved === true)
         console.log(approved );
        if (result.length == 0) {
            return res.status(404).json({ message: "No Data Found" })
        }
        res.status(200).json(approved)
    } catch (error) {
        res.status(400)
    }
})

expense.get('/all-expenses', async (req, res) => {
    try {    
      const result = await exp.find({approved : false})
    if (result.length < 1) {
        return res.status(404).json({
            message: 'no data found'
        })
    }
    res.status(200).json(result)   
    } catch (error) {
       
        res.status(400).json("something went wrong")
    }
   

})

expense.put('/approve/:id' , async(req , res) =>{
    try {
       const id = req.params.id
    console.log(id);
    console.log(req.body);
    const data = await exp.findOneAndUpdate({_id : id} , req.body)
    res.json({message:'success'})  
    } catch (error) {
         res.send("somrthing went wrong")
    }
   
    // console.log(data);
})
module.exports = expense
