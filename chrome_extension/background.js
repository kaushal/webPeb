console.log("hi");

var currentTab = 0;
var minTab = 0;
var maxTab = 0;
var lastTabs = [];
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
      chrome.tabs.query({active: true}, function(tabs){
        lastTabs.push(tabs[0].url);
        maxTab--;

        if(currentTab === maxTab)
        	currentTab--;

      chrome.tabs.remove(tabs[0].id, function(){
        console.log('' + lastTabs[lastTabs.length-1] + " removed");
      });
      });
    }else if(data.action == "reopenTab"){
      chrome.tabs.create({ url: lastTabs[lastTabs.length - 1] });
      lastTabs.slice(0, -1);
      maxTab += 1;
    }else if(data.action == "scrollDown"){
      chrome.tabs.query({active: true}, function(tabs){
        console.log(tabs[0]);
        chrome.tabs.executeScript(tabs[0].id, {code: 'window.scrollBy(0, 50);'}, function(results){
          console.log(results);
        });
      });
    }else if(data.action == "scrollUp"){
      chrome.tabs.query({active: true}, function(tabs){
        console.log(tabs[0]);
        chrome.tabs.executeScript(tabs[0].id, {code: 'window.scrollBy(0, -50);'}, function(results){
          console.log(results);
        });
      });
    }else{
      //	console.log("doing nothing");
    }
});
}, 250);
