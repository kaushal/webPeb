console.log("hi");

var currentTab = 0;

setInterval(function(){
$.get('http://localhost:8000/getAction', function(data){
	if(data.action == "change tabs"){
		chrome.tabs.highlight({tabs: currentTab}, function(window){
			console.log(window);	
			currentTab++;
		});		
	}else if(data.action == "scroll down"){
	        window.scrollBy(0,50);	
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


