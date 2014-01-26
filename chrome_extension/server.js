var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var action = "nothing";

app.configure(function(){
	app.set('port', process.env.PORT || 8000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
});

app.get('/getAction', function(req, res){
	 res.header("Access-Control-Allow-Origin", "*");
	res.send({'action': action});	
});

app.get('/setAction', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	action = "scroll down";	
	res.end();	
});

app.get('/unsetAction', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	action = "nothing";	
	res.end();	
});

server.listen(app.get('port'), function(){
	console.log("Server started.");
});
