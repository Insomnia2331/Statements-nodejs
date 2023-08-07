//导入 mongoose
let mongoose = require('mongoose')
let movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    price: Number
})

let movieModel= mongoose.model('movies', movieSchema)

module.exports = movieModel