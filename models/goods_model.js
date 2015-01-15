var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var GoodsSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	name: String,
	longname: String,
	dep: Number,	//分类
	cat: String,	//分类路径
	totallCount: Number,   //总数量
	lastCount: Number,    // 剩余数量
	img: String,
	desc: String,		//描述
	content: String,   //详细
	price: Number,
	salePrice: Number,
	mid: Schema.Types.ObjectId,
	createDate: Date
}); 