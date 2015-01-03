
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var loginRecordSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Uid: Schema.Types.ObjectId,
	ip: String,
	dateTime : Date
});

var LoginRecordModel = mongoose.model('LoginRecord', loginRecordSchema);

var LoginRecordObj  = {
	save: function (obj, callback){
		var LoginRecord = new LoginRecordModel(obj); 
		LoginRecord.save(function (err, obj){
			callback(err, obj);
		});
	},
	findOne: function(criterion, callback){
		LoginRecordModel.findOne(criterion, function (err, loginRecord){
			callback(err, loginRecord);
		});
	}
}

module.exports = LoginRecordObj;