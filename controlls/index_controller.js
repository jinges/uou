var async =  require('async');

var User = require('../models/user_model');
var unit = require('../unit/index');

var indexCtrl = {
	init: function (req, res){
	   unit.init(req, res, 'index', '首页');
	}
}

module.exports = indexCtrl;