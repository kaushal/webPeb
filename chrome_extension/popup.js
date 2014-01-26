function sendGet(){
    console.log($('#subid').val());
    $.get(
        'http://107.170.250.170/getAction/' + $('#idid').val(),
        function(data){;}
    );
}



$(function() {
    $('#subid').click(function() {
        var id = $('#idid').val();
        console.log(id);

        chrome.runtime.sendMessage({'id': id}, function(response) {
            console.log(response.farewell);
        });
        window.close();
        /*
           console.log($('#idid').val());
           var url  = "https://www.google.com/search?q=" + $('#idid').val();
           sendGet();
        //chrome.tabs.create({url: url}); */
    });
});

document.addEventListener('DOMContentLoaded');
