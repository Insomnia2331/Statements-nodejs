//npm i lowdb@1.0.0安装
//导入
let low = require('lowdb')
let FileSync = require("lowdb/adapters/FileSync")
let adapter= new FileSync('db.json')

//获取db对象
let db = low(adapter)

//初始化数据
db.defaults({posts:[], user:{}} ).write()

//获取单条数据
//let res = db.get('posts').find({id:2}).value()
//console.log(res)

//写入数据
//db.get('posts').push({id:3, title:"Good Weather Today"}).write()    //末尾写入
//db.get('posts').unshift({id:1, title:"Good Weather Today"}).write() //头部写入

//获取数据
//console.log(db.get('posts').value())

//删除数据
//db.get('posts').remove({id:1}).write() //会返回被删除的值

//更新数据
db.get('posts').find({id:2}).assign({title: "Not good Actually"}).write()
console.log(db.get('posts').value())
 