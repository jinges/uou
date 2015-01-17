var  async = require('async');

var Category = require('../models/category_model');
var unit = require('../unit/index');

var categoryCtr = {
	getCategory: function (req, res) {
		var mid = req.param('mid');
		Category.find({'mid': mid}, function (err, obj) {
			if(err){
				return res.jsonp({ error: err })
			}
			return res.jsonp(obj);
		});
	}
	/**************************************/
	,initEditCategory: function (req, res){
		unit.init(req, res, 'admin/editcategory', '添加商品分类');
	}
	,addCategory: function (req, res) {
		var obj = {
			_id: unit.createId(),
			mid: req.para('mid'),
			title: req.para('title'),
			itemCount: 0,
			sort: req.para('sort'),
			createDate: new Date()
		}

		Category.save(obj, function(err, category){
			if(err){
				req.flash('error', err);
			} else {
				req.flash('success', '添加分类成功！');
			}
			res.redirect('/category');
		});
	}
    ,delCategory: function (req, res){
    	var query = req.param('query');

    	async.warterfall([
    		function (callback){
    			Category.find(query, function (err, obj){
    				if(obj.itemCount){
    					callback('请先删除该分类下的所有商品！');
    				}
    				callback(err, obj)
    			});
    		},
    		function (obj, callback){
    			Category.delte(query, function(err){
    				callback(err)
    			});
    		}
    		], function (err) {
    			if(err){
    				req.flash('error', err);
    			} else {
    				req.flash('success', '删除分类成功！');
    			}
    		}
    	);
	}
	,updateCategory: function (req, res) {
		var category = {
			title: req.param('title'),
			sort: req.param('sort'),
			lock: req.param('lock')
		}

		Category.update({'_id': req.para('id')},
			{'$set': category}, function (err){
			if(err){
				req.flash('error', err);
			} else {
				 req.flash('success', '修改分类成功！');
			}
			res.redirect('/category');
		});
	}
	,initCategory: function (req, res) {
		unit.init(req, res, 'admin/category', '分类管理');
	}
	,selCategory: function (req, res) {
		var query = req.param('query');
		Category.find(query, function(err, obj){
			if(err){
				return res.json({ error: err })
			}
			return res.json(obj);
		});
	}
}

module.exports = categoryCtr;