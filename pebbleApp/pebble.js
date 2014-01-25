//Generate a random ID if one does not exist in local storage already.
var socketId = parseInt(localStorage.getItem('socketId')) || Math.floor(Math.random() * 11);
simply.title('Your ID number is ' + socketId);
localStorage.setItem('socketId', socketId);

//Listen for accelerometer data.
simply.on('accelTap', function(e) {
  simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});

//Listen for button clicks.
simply.on('singleClick', function(e) {
  simply.subtitle('You pressed the ' + e.button + ' button!');
});
