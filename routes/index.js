var express = require('express');
var router = express.Router();
let low = require('lowdb')
let FileSync = require("lowdb/adapters/FileSync")
let adapter= new FileSync(__dirname + '/../data/db.json')


//获取db对象
let db = low(adapter)

//导入shortid
let shortid = require('shortid')

//导入moment  npm i moment
let moment = require('moment');
const AccountModel = require('../models/AccountModel');

//声明中间件
let checkLogin = require('../middleware/middleware')

/* GET home page. */
//记账本的列表
router.get('/account', checkLogin, function(req, res, next) {
  //获取所有账单信息
  AccountModel.find().sort({time:-1 }).exec((err, data)=>{
    if(err){
      res.status(500).send("Cannot read data")
      return
    }
    res.render('list', {accounts: data, moment:moment})
  })
});


//添加记录
router.get('/account/create',checkLogin, function(req, res, next) {
  res.render('create')
});

router.post('/account', checkLogin,function(req, res) {
  if (!Number(req.body.amount)){
    res.render('fail', {msg:"Sorry please input number in Amount area!", url:'/account/create'})

  } else if (req.body.title && req.body.time && req.body.amount){
    res.render('success', {msg:"Congrets, Adding Success!", url:'/account'})
    AccountModel.create({
      ...req.body,
      time:moment(req.body.time).toDate()
    })
  } else {
    res.render('fail', {msg:"Sorry but adding Failed Because some data lost..", url:'/account/create'})
  }
});

router.get('/account/:id',checkLogin, function(req, res) {
  //获取params的id参数
  let id = req.params.id
  //删除
  AccountModel.deleteOne({_id:id},(err,data)=>{
    if(err){
      res.render('fail', {msg:"Sorry but cannot delete", url:'/account'})
    } else{
      res.render('success', {msg:"Congrets, Delete Success!", url:'/account'})
    }
  })
 
});

module.exports = router;
