//导入 mongoose
let mongoose = require('mongoose')
let bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
})

let bookModel= mongoose.model('books', bookSchema)

module.exports = bookModel