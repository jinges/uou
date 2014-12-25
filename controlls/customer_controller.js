var  async = require('async');

var Customer = require('../models/customer_model');
var loginRecord = require('../models/loginRecord_model');
var unit = require('../unit/index');

var customerCtr = {
	signUp: function (req, res){ //注册
		var  userName = req.param('username')
			,passWord = req.param('password')
			,mid = req.param['mid'];

		var customer = {
			_id: unit.createId(),
			mid: mid,
			userName: userName,
			passWord: unit.setPassword( passWord ),
			regDate: new Date()
		}
		Customer.save(customer, function (err, obj){
			if(err){
			    return res.jsonp({error: err});
			}
			return res.jsonp(obj);
		});
	},
	checkMember: function (req, res) { //验证用户是否已存在
		var  userName = req.param('username');

		Customer.find({'userName': userName}, function (err, user) {
			if(err){ 
			    return res.jsonp({error: err});
			}

			if(user.length<1){
				return res.jsonp({status: 0})
			} 

			return res.jsonp({status: 1});
		})
	},
	logIn: function (req, res){// 登录
		var  userName = req.param('username')
			,passWord = req.param('password');

		var criterion={
			'userName': userName, 
			'passWord': unit.setPassword( passWord )
		}

		async.waterfall([
			function (callback) {
				Customer.find(criterion, function (err, user) {
					if (err) {
						callback(err);
					}
					else if(user.length<1){
						callback("密码输入有误！");
					} else {
						callback(null, user[0]);
					}
				});
			},
			function (user, callback) {
				// 2 score for login
				Customer.modifyScore(user._id, 2, function (err) {
					err ? callback(err) : callback(null, user);
				});
			},
			function (user, callback) {
				var obj = {
					_id: unit.createId(),
					sid: user._id,
					ip: req.ip,
					dateTime: new Date()
				}
				
				loginRecord.save(obj, function (err) {
					err ? callback(err) : callback(null, user);
				});
			}
			], function (err, result){
				if(err) {
			    	return res.jsonp({error: err});
				}
				return res.jsonp(result);
			})
	},
	/****************** 后台 ************************/
	selCustomers : function (req, res) { //会员列表
		var criterion = req.param('params');

		Customer.find(criterion, function (err, obj) {
			if(err){
				return res.json({ error: err })
			}
			return res.json(obj);
		})
	},
	delCustomer: function (req, res) {  //删除用户(暂时还有问题)
		var criterion = req.param('params');

		Customer.delete(criterion, function (err) {
			if(err){
				return res.json({ error: err })
			}
			return res.json({'success': '删除成功！'});
		})
	}
}

module.exports=customerCtr;