// index.js 
// 加载express模块
const express = require('express');
// 初始化express实例
const app = express();
// 配置端口号监听
app.listen(3000, () => {
    console.log(`Server started on 3000`);
});
// 1.加载模块   mongodb
const mongodb = require("mongodb");
const {
    clearScreenDown
} = require("readline");
// 2.初始化/创建 mongoClient    
const MongoClient = mongodb.MongoClient;
// 3.声明URL和端口号
const url = "mongodb://127.0.0.1:27017";
// 创建路由对象
const router = express.Router();
// 设置资源访问的响应头 router.all("/path",function(req,res,next){}) all所有的方法
router.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Origin", "*"); //访问控制允许来源,所有
    // res.header("Access-Control-Allow-Origin","http://localhost:5500");//只允许http://localhost:5500进行访问
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); //访问控制允许报头 X-Requested-With: xhr请求
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //访问控制允许方法
    res.header("X-Powered-By", '3.2.1'); //自定义头信息，表示服务端用3.2.1
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); //下一步
})
// 登录
router.get("/login", (req, res) => {
    // console.log(req.query);
    MongoClient.connect(url, clearScreenDown, (err, client) => {
        if (err) {
            // 错误处理
            console.log("连接数据库失败：" + err)
        } else {
            console.log("链接数据库成功");
            // console.log(client);
            // 5.链接数据库
            var web1 = client.db("web1");
            // console.log(web1);
            // 6.链接集合
            var students = web1.collection("students");
            students.find(req.query).toArray((err, result) => {
                if (err) {
                    console.log("查询失败：" + err)
                } else {

                    if (result.length > 0) {
                        // console.log("查询成功");
                        res.send({
                            msg: "success"
                        })
                    } else {
                        res.send({
                            msg: "error"
                        })
                    }
                }
            })
        }
    })

})
// 注册
router.get("/reg", (req, res) => {
    // console.log(req.query);
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            // 错误处理
            console.log("连接数据库失败：" + err)
        } else {
            console.log("链接数据库成功");
            // console.log(client);
            // 5.链接数据库
            var web1 = client.db("web1");
            // console.log(web1);
            // 6.链接集合
            var students = web1.collection("students");
            students.insertOne(req.query, (err, result) => {
                if (err) {
                    console.log("插入数据失败：" + err)
                    res.send({
                        "msg": "error"
                    })
                } else {
                    // console.log("插入数据成功");
                    res.send({
                        "msg": "success"
                    })
                }
            })
        }
    })
})
// MongoClient.connect(url, {
//     useNewUrlParser: true
// }, (err, client) => {
//     var web1 = client.db("web1");
// var students = web1.collection("students");
// students.deleteMany({"name":"憨憨1"

// }, (err, result) => {
//     if (err) {
//         console.log("删除数据失败" + err)
//     } else {
//         console.log("删除数据成功");
//         // console.log(result)
//     }
// })
// })
app.use(router);