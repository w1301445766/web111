const express = require("express");
const router = express.Router();
const handlers = require("./01");
router.get('/', (req, res) => {
    var data = {
        "name": req.query.name,
        "psw": Number(req.query.psw)
    }
    console.log(data)
    handlers("teachers", "find", {}, (result) => {
        console.log(result)
        if (result.length > 0) {
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
module.exports = router;