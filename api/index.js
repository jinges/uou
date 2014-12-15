var express = require('express');
var router = express.Router();

var unit = require('../unit/index');
var customerCtr = require('../controlls/customer_controller');


/****** 接口 ******/
//注册
router.get('/signUp', customerCtr.signUp);
//登录
router.get('/signIn', customerCtr.signIn);



module.exports = router;