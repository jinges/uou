
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var loginRecordSchema = new Schema({
	sid: String,
	ip: String,
	Date : {
		type : Date(),
		default : Date.now
	}
});

var LoginRecordModel = mongoose.model('LoginRecord', LoginRecordSchema);

var LoginRecordObj  = {
	save: function (obj, callback){
		var LoginRecord= new LoginRecordModel(obj);
		LoginRecord.save(function (err, obj){
			callback(err, obj);
		});
	},
	findAll: function(query, callback){
		LoginRecordModel.find(query, function (err, loginRecord){
			callback(err, loginRecord);
		});
	},
	findOne: function(query, callback){
		LoginRecordModel.findOne(query, function (err, loginRecord){
			callback(err, loginRecord);
		});
	}
}

module.exports = LoginRecordObj;