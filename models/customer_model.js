var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	_id:Schema.Types.ObjectId,
	mid: Schema.Types.ObjectId,
	name: String,
	userName: String,
	passWord: String,
	gender: Number,
	photo : String,
	birthDay: Date,
	lock: Boolean,
	wallet: Number,
	score: {
		type: Number, 
		default:10, 
		min:10
	},
	regDate : Date
});

var CustomerModel = mongoose.model('Customer', CustomerSchema);

var CustomerObj = {
	save: function (obj, callback){
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
	update: function (criterion,customer, callback) {
		CustomerModel.update( criterion, customer, function (err) {
			callback(err);
		}); 
	},
	find: function (criterion, callback) {
		CustomerModel.find(criterion, {'passWord': 0}, function (err, customers) {
			callback(err, customers);
		});
	},
	modifyScore: function (id, score, callback){
		CustomerModel.update({"_id": id}, {"$inc": {"score": score}}, function (err) {
			callback(err);
		});
	}
}

module.exports = CustomerObj;