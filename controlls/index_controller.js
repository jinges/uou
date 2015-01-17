var async =  require('async');

var unit = require('../unit/index');

var indexCtrl = {
	initPage: function (req, res){
	    unit.init(req, res, 'admin/index', '首页');
	}
}

module.exports = indexCtrl;