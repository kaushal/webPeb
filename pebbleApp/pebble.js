simply.title('WebPeb');

var session = function(socketId){
  simply.title('Your ID number is ' + socketId);
  localStorage.setItem('socketId', socketId);

  //Listen for accelerometer data.
  simply.on('accelTap', function(e) {
    var action;
    if(e.axis === 'y' || e.axis === 'z'){
      if(e.direction > 0){
        action = 'tabLeft';
      }else{
        action = 'tabRight';
      }
    }else{
      if(e.direction > 0){
        action = 'closeTab';
      }else{
        action = 'reopenTab';
      }
    }

    simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');

    var options = {
      url: 'http://107.170.250.170/updateSession',
      method: 'post',
      data: {'action': action, 'pebID': socketId}
    };

    ajax(options, function(data){
      simply.subtitle(action);
      simply.vibe('short');
    });
  });

  //Listen for button clicks.
  simply.on('singleClick', function(e) {
    simply.subtitle('You pressed the ' + e.button + ' button!');

    var action;
    if(e.button === 'down'){
      action = 'scrollDown';
    }else if(e.button === 'up'){
      action = 'scrollUp';
    }else{
      action = 'select';
    }

    var options = {
      url: 'http://107.170.250.170/updateSession',
      method: 'post',
      data: {'action': action, 'pebID': socketId}
    };

    ajax(options, function(data){
      simply.subtitle(action);
      simply.vibe('short');
    });
  });
}

ajax({'url': 'http://107.170.250.170/initiateSession'}, function(data){
  session(data);
});
