//Generate a random ID if one does not exist in local storage already.
var socketId = parseInt(localStorage.getItem('socketId')) || Math.floor(Math.random() * 9999);
simply.title('Your ID number is ' + socketId);
localStorage.setItem('socketId', socketId);

//Listen for accelerometer data.
simply.on('accelTap', function(e) {
  simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
  var options = {
    url: 'http://www.webpeb.com/accelerometer',
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
    url: 'http://www.webpeb.com/button',
    method: 'post',
    data: {'button': e.button, 'pebID': socketId}
  };

  ajax(options, function(data){
    simply.vibe('short');
  });
});
