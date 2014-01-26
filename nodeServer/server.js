var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var action = "nothing";
var sessions = [];

//generates unique id # to be used as a key and relevant vars
function createSession(sessions){
	var newSession = {};
	newSession.id = getNewId(sessions);	
	newSession.action = "nothing";
	newSession.retrieved = false;
	sessions.push(newSession);
	return newSession.id;
}

//will crash if all 900 slots are being used. fix later
function getNewId(ids){
	var unique = true;
	var newId = getRandomInt(100, 999);
	for(var i = 0; i < ids.length; i++){
		if(ids[i].id == newId)
			unique = false;
	}

	if(!unique)
		return getNewId(ids);
	else
		return newId;
}

function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.configure(function(){
	app.set('port', process.env.PORT || 8000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
});

//request sent by pebble to initiate a new session
app.get('/initiateSession', function(req, res){
	var newId = createSession(sessions);
	res.send({'id': newId});
	console.log(sessions);
});

//request sent by pebble to update session's action
app.post('/updateSession', function(req, res){
	//check for case where key is not in session dict
	
	var session;
	for(var i = 0; i < sessions.length; i++){
		if(sessions[i].id == req.body.id){
			sessions[i].id = req.body.id;
			sessions[i].action = req.body.action;
			sessions[i].retrieved = false;
			console.log(sessions[i]);
		}
	}

	res.end();
});

//request sent by chrome extension to get latest action
app.get('/getAction', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	for(var i = 0; i < sessions.length; i++){
		if(sessions[i].id == req.query.id){
			if(!sessions[i].retrieved){
				sessions[i].retrieved = true;
				res.send({'action': sessions[i].action});
			}else{
				res.send({'action': 'nothing'});
			}
		}
	}
});

server.listen(app.get('port'), function(){
	console.log("Server started.");
});
