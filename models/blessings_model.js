var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlessingsSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Uid: Schema.Types.ObjectId,
	title: String,
	blessings: String,
	style: Array,
	views: Number,
	publishTime: {type: Date, default: Date.now}
});

var BlessingsModel = mongoose.model('Blessings', BlessingsSchema);

var BlessingsObj = {
	save: function (obj, callback) {
		var Blessings = new BlessingsModel(obj);
		Blessings.save(function (err, obj) {
			callback(err, obj);
		});
	},
	delete: function (criterion, callback) {
		BlessingsModel.remove(criterion, function (err){
			callback(err);
		});
	}, 
	update: function (Blessings, callback) {
		BlessingsModel.update({'_id': Blessings._id}, Blessings, function (err) {
			callback(err);
		});
	},
	find: function (criterion, callback) {
		BlessingsModel.find(criterion, function (err, blessings) {
			callback(err, blessings);
		});
	},
	modifyViews: function (id){
		CustomerModel.update({"_id": id}, {"$inc": {"score": 1}}, function (err) {
			
		});
	}
}

module.exports = BlessingsObj;