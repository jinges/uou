var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash =  require('connect-flash');
var configer = require('./config/configer');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var api = require('./api/index');

var app = express();

//链接数据库
mongoose.connect(configer.URL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: configer.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: configer.URL,//'mongodb://'+configer.HOST+':27017/'+configer.DB,
        db: configer.DB,
        username: configer.USERNAME,
        password: configer.PASSWORD
    })
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err,
        error: {}
    });
});


module.exports = app;
