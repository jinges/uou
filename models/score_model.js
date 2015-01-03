var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Uid: Schema.Types.ObjectId,
	ActionName: String,
	score: Number,
	DateTime: Date
});

var ScoreModel = mongoose.model('Score', ScoreSchema);

var ScoreObj = {
	save: function (obj, callback) {
		var Score = new ScoreModel(obj);
		Score.save(function (err, obj) {
			callback(err, obj);
		});
	},
	find: function (criterion, callback) {
		ScoreModel.find(criterion, function (err, scores) {
			callback(err, scores);
		});
	}
}