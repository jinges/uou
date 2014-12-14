var async =  require('async');

var unit = require('../unit/index');

var indexCtrl = {
	init: function (req, res){
	   unit.init(req, res, 'index', '首页');
	}
}

module.exports = indexCtrl;