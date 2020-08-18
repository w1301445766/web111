var express = require('express');
var router = express.Router();
const handlers = require("./01");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
// 获取学员数据
router.get('/stu_info', (req, res) => {
  handlers("students", "find", {}, (result) => {
      // console.log(result)
      if (result.length > 0) {
          res.send({
              "msg": "success",
              "data":result
          })
      } else {
          res.send({
              "msg": "error"
          })
      }
  })
})
// 删除信息
router.post('/stu_del', (req, res) => {
    // console.log(req.body);
    handlers("students", "delete",req.body, (result) => {
        console.log(result)
        if (result.deletedCount > 0) {
            res.send({
                "msg": "success"
                
            })
        } else {
            res.send({
                "msg": "error"
            })
        }
    })
  })


// 修改
router.post("/stu_change", (req, res) => {
    console.log(req.body);
    // handlers("students", "update",req.body, (result) => {
    //   if (result.modifiedCount>0) {
    //     res.send({"msg":"success"})
    //   } else {
    //     res.send({
    //       "msg": "error"
    //     })
    //   }
    // })
  })
  





module.exports = router;
