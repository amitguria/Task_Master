const mongoose = require('mongoose')

//create our own schema
const TodoSchema = new mongoose.Schema({
    title: String,
    content: String
})

const TodoModel = mongoose.model("todos", TodoSchema) //todos is the name of our database
module.exports = TodoModel