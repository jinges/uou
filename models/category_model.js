var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
	_id: Schema.Types.ObjectId,
	mid: Schema.Types.ObjectId,
	code: Number
	title: String,
	count: Number,
	brand: [
		{
			name: String,
			code: Number,
			count: Number
		}
	]
	createDate: Date 
}); 