chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.task == "getIsbnC")
    {
    	var infoDiv = document.getElementById("info");
		  var rawHtml = infoDiv.innerHTML;
		  var patt1 = new RegExp("ISBN:</span>(.*?)<br>","m");
		  var isbn = patt1.exec(rawHtml)[1];
      alert("content"+isbn);
		  if(isbn !== "")
  		    sendResponse({'isbn': isbn});
    }

  });