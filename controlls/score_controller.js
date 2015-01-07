var Score = require('../models/score_model');
var unit = require('../unit/index');

var ScoreCtr = {
	writeScore: function (uid, name, score) {
		var ScoreObj = {
			_id: unit.createId(),
			Uid: uid,
			ActionName: name,
			score: score,
			DateTime: new Date()
		}
		Score.save(ScoreObj, function (err) {
			if(err){
				return err;
			}
		});
	},
	readScore: function (req, res) {
		
	}
} 