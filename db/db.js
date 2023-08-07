module.exports = function(success, error){
    let mongoose = require('mongoose')
    let {DBHOST, DBPORT,DBNAME} = require('../config/config')

    //3.连接 mongodb 服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    //4.设置回调
    //成功
    mongoose.connection.once('open', ()=>{
        success()
    })

    //失败
    mongoose.connection.on('error', ()=>{
        console.log("Connect Failed")
    })

    //关闭
    mongoose.connection.on('close', ()=>{
        console.log("Connect Closed")
    })

    //设置关闭
    // setTimeout(()=>{
    //     mongoose.disconnect()
    // },5000)
}