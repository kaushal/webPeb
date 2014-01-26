console.log("hi");

var currentTab = 0;
var minTab = 0;
var maxTab = 0;
chrome.tabs.query({},function(tabs){
    maxTab = tabs.length;
    console.log(maxTab);
});
var currentId = 200;

chrome.tabs.query({active: true}, function(tabs){
    currentTab = tabs[0].index;
    console.log(currentTab);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    currentId = message.id;
    console.log("received content message");
    console.log(message);
});

setInterval(function(){
    $.get('http://107.170.250.170/getAction', {id: currentId}, function(data){
        console.log(data);

        if(data.action == "tabRight"){
            currentTab++;
            if(currentTab > maxTab)
                currentTab = 0;

            chrome.tabs.highlight({tabs: currentTab}, function(window){
                console.log(window);
            });
        }else if(data.action == "tabLeft"){
            currentTab--;
            if(currentTab < minTab)
                currentTab = maxTab;

            chrome.tabs.highlight({tabs: currentTab}, function(window){
                console.log(window);
            });
        }else if(data.action == "closeTab"){
            console.log('attempting to close tab');
            chrome.tabs.remove(currentTab, function() { });
            currentTab--;
            maxTab--;
        }else if(data.action == "reopenTab"){

        }else if(data.action == "scrollDown"){
            window.scrollBy(0,50);
        }else if(data.action == "scrollUp"){
            window.scrollBy(0,50);
        }else{
            //	console.log("doing nothing");
        }
    });
}, 1000);

