var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LogSchema = new Schema({
	id: Schema.Types.ObjectId,
	Uid: Schema.Types.ObjectId,
	action: Number,
	createTime: {type: Date, default: Date.now}
});

var LogModel = mongoose.model('Log', LogSchema);

var LogObj = {
	save: function (obj, callback) {
		var Log = new LogModel(obj);
		Log.save(function (err, obj) {
			callback(err, obj);
		});
	},
	delete: function (criterion, callback) {
		LogModel.remove(criterion, function (err){
			callback(err);
		});
	}, 
	update: function (Log, callback) {
		LogModel.update({'_id': Log._id}, Log, function (err) {
			callback(err);
		});
	},
	find: function (criterion, callback) {
		LogModel.find(criterion, function (err, Log) {
			callback(err, Log);
		});
	}
}