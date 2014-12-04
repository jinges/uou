var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlessingsSchema = new Schema({
	id: Schema.Types.ObjectId,
	SID: Schema.Types.ObjectId,
	CID: Schema.Types.ObjectId,
	blessings: String,
	publishTime: {type: Date, default: Date.now},
	recipients:[Schema.Types.ObjectId]
});

var BlessingsModel = mongoose.model('Blessings', BlessingsSchema);

var BlessingsObj = {
	save: function (obj, callback) {
		var Blessings = new BlessingsModel(obj);
		Blessings.save(function (err, obj) {
			callback(err, obj);
		});
	},
	delete: function (id, callback) {
		BlessingsModel.remove({id: id}, function (err){
			callback(err);
		});
	}, 
	update: function (Blessings, callback) {
		BlessingsModel.update({id: Blessings.id},{'blessings', Blessings.blessings}, function (err) {
			callback(err);
		});
	},
	find: function (id, callback) {
		BlessingsModel.find({id: id}, function (err, blessings) {
			callback(err, blessings);
		});
	}
}