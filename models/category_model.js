var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
	_id: Schema.Types.ObjectId,
	mid: Schema.Types.ObjectId,
	title: String,
	itemCount: Number,  //分类下商品数量
	sort: Number,
	lock: {
		type:Boolean,
		default: true
	},
	createDate: Date 
}); 

var CategoryModel = mongoose.model('Category', CategorySchema);

var CategoryObj = {
	save: function (obj, callback){
		var Category = new CategoryModel(obj);
		Category.save(function (err, obj) {
			callback(err, obj);
		});
	},
	delete: function (query, callback) {
		CategoryModel.remove(query, function (err) {
			callback(err);
		});
	},
	update: function (query,customer, callback) {
		CategoryModel.update( query, customer, function (err) {
			callback(err);
		}); 
	},
	find: function (query, callback) {
		CategoryModel.find(query, function (err, category) {
			callback(err, category);
		});
	},
}

module.exports = CategoryObj;