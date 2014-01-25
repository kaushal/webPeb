var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)


var pebbleDIct = {}
var chromeDict = {}

io.sockets.on('connection', function(socket){
    socket.on('pebCon', function(data){
        console.log('New pebble connection recieved ' + data.toString());
        pebbleDict[socket.id.toString()] = data['number'];
    });

    socket.on('chromeCon', function(data){
        console.log('New chrome connection recieved ' + data.toString());
        chromeDict[socket.id.toString()] = data['number'];
    });

    socket.on('pebUpdate', function(data){
        console.log('New pebble update received ' + data.toString());
        //send information to the chrome client when this happens
    });

});
