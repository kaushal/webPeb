var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)


var pebbleDIct = {}
var chromeDict = {}

io.sockets.on('connection', function(socket){
    socket.on('pebCon', function(data){
        console.log('New pebble connection recieved' + data.toString());
        pebbleDict[data['number']]
    });

});
