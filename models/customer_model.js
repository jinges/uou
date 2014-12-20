var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	_id:Schema.Types.ObjectId,
	userName: String,
	passWord: String,
	name: String,
	gender: Number,
	photo : String,
	birthDay:String,
	score: {
		type: Number, 
		default:10, 
		min:10
	},
	regDate : Date,
	logDate:[Date]
});

var CustomerModel = mongoose.model('Customer', CustomerSchema);

var CustomerObj = {
	save: function (obj, callback){
		obj._id=new mongoose.Types.ObjectId;
		var Customer = new CustomerModel(obj);
	
		Customer.save(function (err, obj) {
			callback(err, obj);
		});
	},
	delete: function (criterion, callback) {
		CustomerModel.remove(criterion, function (err) {
			callback(err);
		});
	},
	update: function (Customer, callback) {
		CustomerModel.update({id: Customer.id}, Customer, function (err) {
			callback(err);
		}); 
	},
	find: function (criterion, callback) {
		CustomerModel.find(criterion, function (err, customers) {
			callback(err, customers);
		});
	},
	modifyScore: function (id, score, callback){
		CustomerModel.update({"_id": id}, {"$inc": {"score": score}}, function (err) {
			callback(err);
		});
	},
	upLogDate: function (id, callback){
		CustomerModel.update({"_id": id}, {"$push": {"logDate": new Date()}}, function ( err ){
			callback(err);
		})
	}
}

module.exports = CustomerObj;