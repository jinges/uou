
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var MerchantSchema = new Schema({
	_id:Schema.Types.ObjectId,
	name : String,
	passWord : String, 
	realName : String,
	phone: String,
	email: String,
	companyName: String,
	addr: String,
	itemCount: Number,  //商家下会员数量
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
	delete: function(query, callback){
		MerchantModel.remove(query, function (err){
			callback(err);
		});
	},
	update: function(query, merchants, callback){
		MerchantModel.update(query, merchants, function (err){
			callback(err);
		});
	},
	find: function(query, callback){
		MerchantModel.find(query, {'passWord': 0}, function (err, merchants){
			callback(err, merchants);
		});
	}
}

module.exports = MerchantObj;