var  async = require('async');

var Customer = require('../models/customer_model');
var unit = require('../unit/index');

var customerCtr = {
	signUpPage: function (req, res) {
		unit.init(req, res, 'signUp', '注册');
	},
	signUp: function (req, res){
		var  userName = req.body.userName
			,passWord = req.body.userPassWord;

		passWord= unit.setPassword( passWord );

		var customer = {
			userName: userName,
			passWord: passWord
		}


		Customer.save(customer, function (err, obj){
			if(err){
			    req.flash('error', err);
				return res.redirect("/");
			}
			req.session.user=obj;
				return res.redirect("/");
		});
	},
	signInPage: function (req, res) {
		unit.init(req, res, 'signIn', '登录');
	},
	signIn: function (req, res){
		var userName=req.body.userName;
		var passWord= req.body.userPassWord;
		var rememberUser = req.body.rememberUser;

		passWord= unit.setPassword( passWord );
		var query={'userName': userName, 'passWord': passWord};
		async.waterfall([
			function (callback) {
				Customer.findOne(query, function (err, user) {
					if (err) {
						callback(err);
					}
					else if(!user){
						callback("用户名或密码错误！");
					} else {
						callback(null, user);
					}
				});
			},
			function (user, callback) {
				// 2 score for login
				Customer.upScore( user._id, 2, function (err) {
					err ? callback(err) : callback(null, user);
				});
			},
			function (user, callback) {
				Customer.upLogDate(user._id, function (err) {
					err ? callback(err) : callback(null, user);
				});
			}
			], function (err, result){
				if(err) {
				    req.flash('error', err);
					return res.redirect("/");
				}

				if( rememberUser ){
					result.rememberUser=true;
				}

				result.score+=1;
				req.session.user=result;
	 			return res.redirect('/admin/index');
			})
	},
}

module.exports=customerCtr;