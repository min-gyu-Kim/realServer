var express = require('express');
var http = require('http');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var path = require('path');
var static = require('serve-static');

var app = express();

var config = require('./config/config');

require('./database/database_loader').init(app, config);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized:true,
    store: require('mongoose-session')(app.get('database').mongoose)
}));

app.set('port', process.env.PORT || config.server_port);

require('./routes/routes_loader').init(app, express.Router());

http.createServer(app).listen(app.get('port'), function(){
   console.log('서버 오픈 port : ' + app.get('port')); 
});