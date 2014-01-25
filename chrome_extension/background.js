//hi
console.log("hi");

//chrome.tabs.create({url:"http://www.google.com"});

chrome.tabs.update(60, {active: true});
chrome.tabs.update(69, {active: false});

/*
chrome.tabs.query({active: true}, function(tabs){
	for(var i = 0;  i < tabs.length; i++){
		chrome.tabs.duplicate(tabs[i].id);
	}
});
*/

chrome.tabs.highlight({tabs: 2}, function(window){
	console.log(window);	
});

/*
chrome.tabs.update(0, {selected: true}, function(){
	console.log("updated tab");
});

chrome.tabs.duplicate(1);
[*/
