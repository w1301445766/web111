const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017";
// 查询数据
function find(collection, data, callback) {
    collection.find(data).toArray((err, result) => {
        if (err) {
            console.log("查询失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 插入数据
function insert(collection, data, callback) {
    collection.insertOne(data, (err, result) => {
        if (err) {
            console.log("插入数据失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 更新
function update(collection, data,callback) {
    collection.updateOne(data[0],{
        $set: data[1]
    }, (err, result) => {
        if (err) {
            console.log("修改失败:" + err)
        } else {
            callback(result)
        }
    })
}
// 删除
function deletes(collection, data, callback) {
    collection.deleteOne(data, (err, result) => {
        if (err) {
            console.log("删除数据失败" + err)
        } else {
            callback(result)
        }
    })
}
// 用一个对象将方法以键值对的方式存储起来
const methodType = {
    find: find,
    insert: insert,
    delete: deletes,
    update: update
}
// 链接本地mongodb数据库
function handlers(collections,type, data, callback) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            console.log("连接数据库失败:" + "err")
        } else {
            console.log("连接数据库成功");
            var db = client.db("web1");
            var collection = db.collection(collections);
          
            methodType[type](collection, data, callback);
            client.close();
        }
    })
}
module.exports = handlers;