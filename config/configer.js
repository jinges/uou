//Mongodb 数据库配置
var configer={
	SECRET: 'app',
	HOST: 'localhost',
	PORTS: '27017',
	DB: 'myapp',
	USERNAME: 'feng',
	PASSWORD: '8777ef3d5561e332c437ce430a5f5ce6'
}
//'+ configer.USERNAME +':'+ configer.PASSWORD +'@
configer.URL = 'mongodb://'+ configer.HOST +':'+ configer.PORTS +'/'+ configer.DB +'';

module.exports = configer;