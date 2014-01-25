var socketId = parseInt(localStorage.getItem('socketId')) || Math.floor(Math.random() * 11);
simply.title('Your ID number is ' + socketId);
localStorage.setItem('socketId', socketId);

simply.on('accelTap', function(e) {
  simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});

simply.on('singleClick', function(e) {
  simply.subtitle('You pressed the ' + e.button + ' button!');
});
