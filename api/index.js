var express = require('express');
var router = express.Router();
var unit=require('../unit/index');

var User = require('../models/admin/user_model');

router.get('/regist', function (req, res){
	var query=req.query;
	User.save({
		name : query.name,
		userName: query.username,
		passWord: unit.setPassword(query.password),
		photo: ''
	}, function(err, user){
		if(err){
			console.log(err);
			res.jsonp({err: err});
			return false;
		}
		res.jsonp({uid: user._id});
	});
});
module.exports = router;