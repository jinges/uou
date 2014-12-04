
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var MerchantSchema = new Schema({
	name : String,
	userName : String,
	passWord : String, 
	shopName: String, 
	addr: String,
	phoneNum: Number,
	regDate : Date,
	logDate:[Date]
});

var MerchantModel = mongoose.model('Merchant', MerchantSchema);

var MerchantObj  = {
	save: function (obj, callback){
		var Merchant= new MerchantModel(obj);
		Merchant.save(function (err, obj){
			callback(err, obj);
		});
	},
	delete: function(id, callback){
		MerchantModel.remove({_id: id}, function (err){
			callback(err);
		});
	},
	batchDelete: function(arrId, callback){
		MerchantModel.remove({_id: {"$in": arrId}}, function (err){
			callback(err);
		});
	},
	update: function(Merchant, callback){
		MerchantModel.update({_id: Merchant._id}, Merchant, function (err){
			callback(err);
		});
	},
	batchUpdate: function(arrMerchant, callback){
		MerchantModel.update({_id: { "$in": arrMerchant }}, arrMerchant, function (err){
			callback(err);
		});
	},
	find: function(query, callback){
		MerchantModel.find(query, function (err, merchants){
			callback(err, merchants);
		});
	},
	upLogDate: function (id, callback){
		MerchantModel.update({"_id": id}, {"$push": {"logDate": new Date()}}, function ( err ){
			callback(err);
		})
	}
}

module.exports = MerchantObj;