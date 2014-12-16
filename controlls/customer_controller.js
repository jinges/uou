var  async = require('async');

var Customer = require('../models/customer_model');
var unit = require('../unit/index');

var customerCtr = {
	signUp: function (req, res){
		var  userName = req.param('username')
			,passWord = req.param('password');

		var customer = {
			userName: userName,
			passWord: unit.setPassword( passWord ),
			regDate: new Date()
		}
		
		Customer.save(customer, function (err, obj){
			if(err){
			    return res.status(500).jsonp({error: err});
			}
			return res.jsonp(obj);
		});
	},
	checkMember: function (req, res) {
		var  userName = req.param('username');

		Customer.find({'userName': userName}, function (err, user) {
			if(err){ 
				return res.status(500).jsonp({error: err})
			}

			if(user.length<1){
				return res.jsonp({status: 0})
			} 

			return res.jsonp({status: 1});
		})
	},
	signIn: function (req, res){
		var  userName = req.param('username')
			,passWord = req.param('password');

		var query={
			'userName': userName, 
			'passWord': unit.setPassword( passWord )
		}

		async.waterfall([
			function (callback) {
				Customer.find(query, function (err, user) {
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
				Customer.upLogDate(user._id, function (err) {
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
}

module.exports=customerCtr;