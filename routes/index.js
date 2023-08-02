var express = require('express');
var router = express.Router();
let low = require('lowdb')
let FileSync = require("lowdb/adapters/FileSync")
let adapter= new FileSync(__dirname + '/../data/db.json')

//获取db对象
let db = low(adapter)

//导入shortid
let shortid = require('shortid')


/* GET home page. */
//记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有账单信息
  let accounts = db.get("accounts").value()
  res.render('list', {accounts: accounts})
});


//添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create')
});

router.post('/account', function(req, res) {
  //获取请求体
  //console.log(req.body)
  //console.log(req.body)
  //生成id
  let id = shortid.generate()
  if (req.body.title && req.body.time && req.body.amount){
    db.get('accounts').unshift({id:id, ...req.body}).write()
    res.render('success', {msg:"Congrets, Adding Success!", url:'/account'})
  } else{
    res.render('fail', {msg:"Sorry but adding Failed Because some data lost..", url:'/account/create'})
  }
});

router.get('/account/:id', function(req, res) {
  //获取params的id参数
  let id = req.params.id
  //删除
  db.get('accounts').remove({id:id}).write()
  res.render('success', {msg:"Congrets, Delete Success!", url:'/account'})
});

module.exports = router;
