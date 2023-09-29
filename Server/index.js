const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app= express()
app.use(cors())
app.use(express.json()) //when we pass any data it will change into json format

//create connnection with monogodb
//127.0.0.1 is our own ip address(localhost) and we use test database which is created in mongoose compass
mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get',(req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//update text decoration data 
app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id}) //delete noteItem by using their object _id of mongoose
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const title = req.body.title; //this is our data
    const content = req.body.content;
    
    //Create TodoModel
    TodoModel.create({
        title: title,
        content: content
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () =>{
    console.log("server is running on port 3001")
})

