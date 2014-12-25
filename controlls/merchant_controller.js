var async =  require('async');

var Merchant = require('../models/merchant_model');
var unit = require('../unit/index');

var merchantCtr={ 
	initSignUp: function (req, res) {
		unit.init(req, res, 'sign_up', '注册页面');
	},
	signUp: function (req, res) {
		var merchant = req.body;
		merchant._id = unit.createId();
		merchant.passWord = unit.setPassword(passWord);

		Merchant.save(merchant, function (err, obj) {
			if(err){
				res.flash('error', err);
				return;
			}
			req.redirect('/sign_in');
		});
	},
	initLogIn: function (req, res){
	   unit.init(req, res, 'sign_in', '登录');
	},
	logIn: function (req, res){
		var query = req.body;
		query.passWord=unit.setPassword( passWord );

		async.waterfall([
			function (callback) {
				Merchant.findOne(query, function (err, merchant) {
					if (err) {
						callback(err);
					} else if(!merchant){
						callback("用户名或密码错误！");
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
					dateTime: new Date()
				}
				
				loginRecord.save(obj, function (err) {
					err ? callback(err) : callback(null, merchant);
				});
			}
			], function (err, result){
				if(err) {
				    req.flash('error', err);
					return res.redirect("/");
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
	}
};

module.exports = merchantCtr;