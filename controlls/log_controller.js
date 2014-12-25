var Log = require('../models/log_model');

var LogCtr = {
	enums: [
		'创建祝福语',  //  '0'
		'删除祝福语'  //  '1'
	],
	writeLog: function (uid, enumsItem) {
		var log = {
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
				cid = 0,
				j = 0,
				logEnums = LogCtr.enums;

			for(var i=0; i< obj.length; i++){
				var userId=obj[i].Uid;
				if(cid != userId){
					j++;
					logArry[j].Cid = userId
				}
				logArry[j].log.push({'content': logEnums[obj[i].action], 'Date': obj[i].createTime});

				cid = userId;
			}
			return logArry;
		})
	}
}