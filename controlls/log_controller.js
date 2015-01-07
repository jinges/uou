var Log = require('../models/log_model');
var unit = require('../unit/index');

var LogCtr = {
	enums: [
		'创建祝福语 ',  //  '0'
		'删除祝福语'  //  '1'
	],
	writeLog: function (uid, enumsItem) {
		var log = {
			_id: unit.createId(),
			Uid: uid,
			action: enumsItem,
			createTime: new Date()
		}

		Log.save(log, function (err) {
			if(err){
				return false;
			}
			return true;
		});
	},
	readLog: function (criterion) {
		Log.find(criterion, function (err, obj) {
			if(err){
				return null;
			}

			var logArry = {},
				uid = 0,
				j = 0,
				logEnums = LogCtr.enums;

			for(var i=0; i< obj.length; i++){
				var userId=obj[i].Uid;
				if(uid != userId){
					j++;
					logArry[j].uid = userId
				}
				logArry[j].log.push({'content': logEnums[obj[i].action], 'Date': obj[i].createTime});

				uid = userId;
			}
			return logArry;
		})
	}
}