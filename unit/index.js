
var crypto=require('crypto');
var mongoose=require('mongoose');
var log = require('../controlls/log_controller');

//公共方法
module.exports={
	init: function (req, res, route, title) {
		res.render(route, { 
		    	title: title,
		    	user: req.session.user
	 		});
		},
 	formatDate: function (date){ //格式化日期
		var date = date || new Date(); 
		return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	},
	setPassword: function (password){ //MD5加密
		var md5=crypto.createHash('md5');
 		return md5.update(password).digest('hex');
	},
	checkLogin: function (req, res, next) { //判断是否登录
 		if (!req.session.user) {
 			req.flash('error', '未登录!'); 
 			res.redirect('/login');
 		}
 		next();
 	},
 	checkNotLogin: function (req, res, next) { //
 		if (req.session.user) {
 			req.flash('error', '已登录!'); 
 			res.redirect('/user');
 		}
 		next();
 	},
 	createId: function () {
 		return new mongoose.Types.ObjectId;	
 	},
 	writeLog: function (uid, enumItem) {
 		log.writeLog(uid, enumItem);
 	}
}