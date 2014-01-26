simply.title('WebPeb');

var session = function(socketId){
  simply.title('Your ID number is ' + socketId);
  localStorage.setItem('socketId', socketId);

  //Listen for accelerometer data.
  simply.on('accelTap', function(e) {
    simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');

    var options = {
      url: 'http://107.170.250.170/updateSession',
      method: 'post',
      data: {'direction': e.direction, 'axis': e.axis, 'pebID': socketId}
    };

    ajax(options, function(data){
      simply.vibe('short');
    });
  });

  //Listen for button clicks.
  simply.on('singleClick', function(e) {
    simply.subtitle('You pressed the ' + e.button + ' button!');

    var options = {
      url: 'http://107.170.250.170/updateSession',
      method: 'post',
      data: {'button': e.button, 'pebID': socketId}
    };

    ajax(options, function(data){
      simply.vibe('short');
    });
  });
}

ajax({'url': 'http://107.170.250.170/initiateSession'}, function(data){
  str = "";
  for(var field in data){
    if(data.hasOwnProperty(field)){
      str += ", " + data[field];
    }
  }
  simply.subtitle(str);
});
