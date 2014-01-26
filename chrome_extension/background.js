console.log("hi");

var currentTab = 0;
var minTab = 0;
var maxTab = 3;
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
        chrome.tabs.getCurrent(function(tab) {
                chrome.tabs.remove(tab.id, function() { });
        });
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

//chrome.tabs.create({url:"http://www.google.com"});

//chrome.tabs.update(60, {active: true});
//chrome.tabs.update(69, {active: false});

/*
chrome.tabs.query({active: true}, function(tabs){
	for(var i = 0;  i < tabs.length; i++){
		chrome.tabs.duplicate(tabs[i].id);
	}
});
*/

//add code to select current window
/*
chrome.tabs.highlight({tabs: 2}, function(window){
	console.log(window);
});
*/

/*
chrome.tabs.update(0, {selected: true}, function(){
	console.log("updated tab");
});

chrome.tabs.duplicate(1);
[*/


