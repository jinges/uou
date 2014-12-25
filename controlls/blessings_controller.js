var  async = require('async');

var Customer = require('../models/customer_model');
var Blessing = require('../models/blessings_model');
var unit = require('../unit/index');

var BlessingsCtr = {
	createBlessings: function (req, res) {
		var uid = req.param['cid'];
			Blessings = {
				Uid: uid,
				title: req.param['title'],
				blessings: req.param['blessings'],
				style: req.param['style'],
				publishTime: new Date()
			}

		Blessing.save(Blessings, function (err, obj) {
			if(err){
			    return res.jsonp({error: err});
			}
			unit.writeLog(uid, 1);
			return res.jsonp(obj);
		});
	},

}