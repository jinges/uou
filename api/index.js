var express = require('express');
var router = express.Router();

var customerCtr = require('../controlls/customer_controller');
var blessingsCtr = require('../controlls/blessings_controller');


/****** 前端接口 ******/
//注册
router.get('/signUp', customerCtr.signUp);
//登录
router.get('/logIn', customerCtr.logIn);
//验证用户是否存在
router.get('/checkMember', customerCtr.checkMember);

//创建贺卡
router.get('/createBlessings', blessingsCtr.createBlessings);
//阅览贺卡
router.get('/blessings', blessingsCtr.findBlessings);
//更新uid
route.get('/updateUid', blessingsCtr.updateUid);

module.exports = router;