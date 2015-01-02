function getDomainFromUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;
     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
     if(getDomainFromUrl(tab.url).toLowerCase()=="book.douban.com"){
          chrome.pageAction.show(tabId);
     }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     chrome.tabs.sendMessage(tabs[0].id, {task: "getIsbnC"}, function(response) {
          alert("isbnFromBg"+response.isbn);
          chrome.runtime.sendMessage({'task':'isbnFromBg','isbn': isbn_tmp}, function(response) {
        });
     });
});




