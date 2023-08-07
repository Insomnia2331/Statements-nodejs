//导入 mongoose
let mongoose = require('mongoose')
let UserSchma = new mongoose.Schema({
    username:String,
    password:String
})

let UserModel= mongoose.model('users', UserSchma)

module.exports = UserModel