simply.on('accelTap', function(e) {
    simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});

simply.on('singleClick', function(e) {
    simply.subtitle('You pressed the ' + e.button + ' button!');
});
