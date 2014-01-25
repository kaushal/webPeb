var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)


var pebbleDict = {}
var chromeDict = {}

io.sockets.on('connection', function(socket){
    socket.on('pebCon', function(data){
        console.log('New pebble connection recieved ' + data.number.toString());
        pebbleDict[socket.id.toString()] = data['number'];
    });

    socket.on('chromeCon', function(data){
        console.log('New chrome connection recieved ' + data.number.toString());
        chromeDict[data['number']] = socket.id.toString();
    });

    socket.on('pebUpdate', function(data){
        console.log('New pebble update received ' + data.toString());
        var sockIdStr = socket.id.toString();
        if(sockIdStr in pebbleDict){
            var number = pebbleDict[sockIdStr];
            if(number in chromeDict){
                io.sockets.socket(chromeDict[number]).emit('update', data);
            }
        }
        //send information to the chrome client when this happens
    });

});

server.listen(3000);
