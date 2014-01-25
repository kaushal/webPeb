simply.on('accelTap', function(e) {
    simply.vibe('short');
    simply.subtitle('You tapped across ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});
