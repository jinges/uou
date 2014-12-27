var  async = require('async');

var Customer = require('../models/customer_model');
var Blessing = require('../models/blessings_model');
var unit = require('../unit/index');

var BlessingsCtr = {
	createBlessings: function (req, res) {
		var blessings = {
				_id: unit.createId();
				Uid: req.param('cid'),
				title: req.param('title'),
				blessings: req.param('blessings'),
				style: req.param('style'),
				publishTime: new Date()
			}

		Blessing.save(blessings, function (err, obj) {
			if(err){
			    return res.jsonp({error: err});
			}
			unit.writeLog(uid, 1);
			return res.jsonp(obj);
		});
	},
	findBlessings: function (req, res) {
		var criterion = {
				_id: unit.createId();
			}
		Blessings.find(criterion, function (err, obj) {
			if(err){
			    return res.jsonp({error: err});
			}
			modifyViews(obj._id, function (err) {
				//暂无处理
			});
			return res.jsonp(obj);
		});
	},
	updateBlessings: function (req, res){  // 
		var blessings = {
				_id: unit.createId();
				Uid: req.param('cid'),
				title: req.param('title'),
				blessings: req.param('blessings'),
				style: req.param('style'),
				publishTime: new Date()
			}
			Blessings.update(blessings, function (err) {
				if(err){
					return res.jsonp({'error': err});
				}
				return res.jsonp({'success': 'success'});
			});
	}，
	updateUid: function (req, res) {
		var blessings = {
			_id: unit.createId();
			Uid: req.param('cid'),
		}
		Blessings.update(blessings, function (err) {
			if(err){
				return res.jsonp({'error': err});
			}
			return res.jsonp({'success': 'success'});
		});
	}，
	/***************后台*******************/
	selBlessings: function (req, res) {
		var criterion = req.param("params");

		Blessings.find(criterion, function (err, obj) {
			if(err){
				return res.jsonp({"error": err});
			}
			return res.jsonp(obj);
		});
	}
}