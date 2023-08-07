//导入 mongoose
let mongoose = require('mongoose')
let AccountSchma = new mongoose.Schema({
    title:String,
    time: Date,
    type:{
        type: Number,
        default: -1 
    },
    amount:Number,
    remarks: String
})

let AccountModel= mongoose.model('Account', AccountSchma)

module.exports = AccountModel