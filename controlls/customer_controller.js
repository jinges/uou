var  async = require('async');

var Customer = require('../models/customer_model');
var Merchant = require('../controlls/merchant_controller');
var loginRecord = require('../models/loginRecord_model');
var ScoreCtr = require('../controlls/score_controller');
var unit = require('../unit/index');

var CustomerCtr = {
	signUp: function (req, res){ //注册
		var customer = {
			_id: unit.createId(),
			mid: req.param('mid'),
			name: req.param('name'),
			userName: req.param('username'),
			passWord: unit.setPassword( req.param('password') ),
			regDate: req.param('date')
		}

		async.waterfall([
			function (callback){
				Customer.save(customer, function (err, user){
					if(err){
					    callback(err);
					}else {
						callback(err, user[0])
					}
				});
			},
			function (user, callback){
				Merchant.upCustomerCount(req.param('mid'),1, function (err) {
					callback(err, user);
				});
			}
			], function (err, callback) {

			}
		);

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
				this.modifyScore(user._id,2,function (err) {
					callback(err,user);
				});
			},
			function (user, callback) {
				var obj = {
					_id: unit.createId(),
					sid: user._id,
					ip: req.ip,
					createDate: new Date()
				}
				
				loginRecord.save(obj, function (err) {
					callback(err, user);
				});
			}
			], function (err, customer){
				if(err) {
			    	return res.jsonp({error: err});
				} 

				ScoreCtr.writeScore(customer._id,'登录',2);

				return res.jsonp(customer);
			})
	},
	modifyScore: function (id,num, callback){
		Customer.modifyScore(id, num, function (err) {
			callback(err);
		});
	},
	/****************** 后台 ************************/
	initCustomer: function (req, res) {
		unit.init(req, res, 'admin/customer', '会员管理');
	},
	selCustomers : function (req, res) { //会员列表
		var query = req.param('params');
		
		Customer.find(query, function (err, obj) {
			if(err){
				return res.json({ error: err })
			}
			return res.json(obj);
		})
	},
	delCustomer: function (req, res) {  //删除用户
		var	id = req.param('_id');
		Customer.delete({'_id': id}, function (err) {
			if(err){
				return res.json({'status': 0, error: err })
			}
			return res.json({'status': 1,'success': '删除成功！'});
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