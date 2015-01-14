var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var GoodsSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	title: String,
	createDate: Date 
}); 