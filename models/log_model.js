var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LogSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Uid: Schema.Types.ObjectId,
	action: Number,
	createDate: {type: Date, default: Date.now}
});

var LogModel = mongoose.model('Log', LogSchema);

var LogObj = {
	save: function (obj, callback) {
		var Log = new LogModel(obj);
		Log.save(function (err, obj) {
			callback(err, obj);
		});
	},
	delete: function (query, callback) {
		LogModel.remove(query, function (err){
			callback(err);
		});
	}, 
	update: function (Log, callback) {
		LogModel.update({'_id': Log._id}, Log, function (err) {
			callback(err);
		});
	},
	find: function (query, callback) {
		LogModel.find(query, function (err, Log) {
			callback(err, Log);
		});
	}
}