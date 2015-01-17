var async =  require('async');

var Merchant = require('../models/merchant_model');
var loginRecord = require('../models/loginRecord_model');
var unit = require('../unit/index');

var merchantCtr={ 
	initSignUp: function (req, res) {
		res.render('signup', {
			title: '注册页面'
		});
	},
	signUp: function (req, res) {
		var merchant = req.body;
		merchant._id = unit.createId();
		merchant.passWord = unit.setPassword(merchant.passWord);
		merchant.regDate = new Date();

		delete merchant.rePassWord;
		Merchant.save(merchant, function (err, obj) {
			if(err){
				return res.flash('error', err);
			}
			res.redirect('/login');
		});
	},
	initLogIn: function (req, res){
	    res.render('login', {
			title: '登录'
		});
	},
	logIn: function (req, res){
		var params = req.body,
			criterion = {};

		criterion = {
			"$or": [
				{'name': params.name},
				{'phone': params.name},
				{'email': params.name}]
			,
			passWord: unit.setPassword( params.passWord )
		}

		async.waterfall([
			function (callback) {
				Merchant.find(criterion, function (err, merchant) {
					if (err) {
						return callback(err);
					} else if(merchant.length<1){
						return callback("您的密码有误！");
					} else {
						callback(null, merchant[0]);
					}
				});
			},
			function (merchant, callback) {
				var obj = {
					_id: unit.createId(),
					sid: merchant._id,
					ip: req.ip,
					creatDate: new Date()
				}
				loginRecord.save(obj, function (err) {
					if (err){
						return callback(err) 
					} else{
						callback(null, merchant);
					} 
				});
			}
			], function (err, result){
				if(err) {
					return res.redirect("/signup");
				}

				req.session.user=result;
	 			return res.redirect('/admin/index');
			})
	},
	selMerchant: function (req, res){
		Merchant.findAll({}, function (err, users){
			res.render('/admin/users', {
				title: '管理员',
				users: users,
	 			user: req.session.user,
	 			success: req.flash('success').toString(),
	 			error: req.flash('error').toString()
			})
		});
	},
	upCustomerCount: function(id,num, callback){
		Merchant.update({'_id': id},
			{'$inc': {'itemCount': num}}, 
			function (err) {
				callback(err);
			}
		);
	}
};

module.exports = merchantCtr;