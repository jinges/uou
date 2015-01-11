var  async = require('async');

var Customer = require('../models/customer_model');
var loginRecord = require('../models/loginRecord_model');
var ScoreCtr = require('../controlls/score_controller');
var unit = require('../unit/index');

var CustomerCtr = {
	signUp: function (req, res){ //注册
		var customer = {
			_id: unit.createId(),
			mid: req.param('mid'),
			userName: req.param('username'),
			passWord: unit.setPassword( req.param('password') ),
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
		var customer={
			'userName': req.param('username'), 
			'passWord': unit.setPassword( req.param('password') )
		}

		async.waterfall([
			function (callback) {
				Customer.find(customer, function (err, user) {
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

				Customer.modifyScore(result._id, 2, function (err) {
					ScoreCtr.writeScore(result._id,'登录',2);
					//暂无处理
				});
				return res.jsonp(result);
			})
	},
	/****************** 后台 ************************/
	initCustomer: function (req, res) {
		unit.init(req, res, 'admin/customer', '会员管理');
	},
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
		var Mid  = req.param('mid'),
			arrId = req.param('arrId');

		//还有问题
		Customer.delete(arrId, function (err) {
			if(err){
				return res.json({ error: err })
			}
			return res.json({'success': '删除成功！'});
		})
	},
	lockCustomer: function (req, res) {  //开启 or 锁定用户
		var arrId = req.param("id"),
			isLock = req.param("locker");
		CustomerCtr.update({'_id': {"$in": arrId}},{'$set': {'lock': isLock}},function(err){
			if(err){
				return res.json({'err': err});
			}

		});
	}
}

module.exports = CustomerCtr;