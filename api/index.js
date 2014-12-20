var express = require('express');
var router = express.Router();

var customerCtr = require('../controlls/customer_controller');


/****** 接口 ******/
//注册
router.get('/signUp', customerCtr.signUp);
//登录
router.get('/signIn', customerCtr.signIn);
//验证用户是否存在
router.get('/checkMember', customerCtr.checkMember);


module.exports = router;