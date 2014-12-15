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
			    return res.stastus(500).jsonp({error: err});
			}
			return res.jsonp(obj);
		});
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
					else if(!user){
						callback("用户名或密码错误！");
					} else {
						callback(null, user);
					}
				});
			},
			function (user, callback) {
				// 2 score for login
				var id=user[0]._id;
				Customer.modifyScore(id, 2, function (err) {
					err ? callback(err) : callback(null, user);
				});
			},
			function (user, callback) {
				var id=user[0]._id;
				Customer.upLogDate(id, function (err) {
					err ? callback(err) : callback(null, user);
				});
			}
			], function (err, result){
				if(err) {
			    	return res.stastus(500).jsonp({error: err});
				}
				return res.jsonp(result);
			})
	},
}

module.exports=customerCtr;