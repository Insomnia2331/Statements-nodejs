var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModer')
const md5 =require('md5')

router.get("/",(req,res)=>{
    res.redirect('/login')
})


//注册
router.get("/reg",(req,res)=>{
    res.render('auth/reg')
})

//注册用户
router.post("/reg",(req,res)=>{
    console.log(req.body);
    UserModel.create({...req.body, password:md5(req.body.password)},(err,data)=>{
        if(err){
            res.status(500).send("Sorry but failed")
        }else{
            res.render('success', {msg:"Success!",url:'/login'})
        }
    })
})

//登录
router.get("/login",(req,res)=>{
    res.render('auth/login')
})

//登录用户
router.post("/login",(req,res)=>{
    //查询数据库 获取用户名和密码
    let {username, password} = req.body
    UserModel.findOne({username:username, password:md5(password)},(err,data)=>{
        if(err){
            res.status(500).send("Sorry but failed")
            //
        }else{
            if(data){
                req.session.username = data.username
                req.session_id = data.session_id
                res.render('success', {msg:"Success!",url:'/account'})
            }else{
                res.render('fail', {msg:"Sorry your username or password is wrong!",url:'/login'})
            }
        }
    })
    
        
})

//退出登录
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success', {msg:"Success logout!",url:'/login'})
    })
})




module.exports = router;
