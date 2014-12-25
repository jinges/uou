
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var MerchantSchema = new Schema({
	_id:Schema.Types.ObjectId,
	realName : String,
	companyName: String,
	userName : String,
	passWord : String, 
	phone: Number,
	email: String,
	addr: String,
	regDate : Date
});

var MerchantModel = mongoose.model('Merchant', MerchantSchema);

var MerchantObj  = {
	save: function (obj, callback){
		var Merchant = new MerchantModel(obj);
		Merchant.save(function (err, obj){
			callback(err, obj);
		});
	},
	delete: function(criterion, callback){
		MerchantModel.remove(criterion, function (err){
			callback(err);
		});
	},
	update: function(Merchant, callback){
		MerchantModel.update({'_id': Merchant._id}, Merchant, function (err){
			callback(err);
		});
	},
	find: function(criterion, callback){
		MerchantModel.find(criterion, function (err, merchants){
			callback(err, merchants);
		});
	}
}

module.exports = MerchantObj;