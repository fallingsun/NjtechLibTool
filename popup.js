// chrome.runtime.sendMessage({'task': 'getIsbnPop'}, function(response) {
//       getBook(response.isbn);
//       alert(response.isbn);
//   });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.task == "isbnFromBg")
    {
      getBook(request.isbn);
      alert(request.isbn);
    }    
});

function getBookList(rawHtml)
{
	var patt1 = new RegExp("<strong class=\"red\">(.*?)<","m");
	var count = patt1.exec(rawHtml)[1];
	var patt2 = new RegExp("</span><a href=\"(.*?)\"","m");
	var url = "http://202.119.248.243:8080/opac/"+patt2.exec(rawHtml)[1];
	return count;
}

function getBook(isbn)
{
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }
  else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 步骤二
  xhr.onreadystatechange = function() {
    var result = document.getElementById("result");
    switch (xhr.readyState) {
      case 0 : result.innerHTML = "0 : 请求未初始化"; break;
      case 1 : result.innerHTML = "1 : 服务器连接已建立"; break;
      case 2 : result.innerHTML = "2 : 请求已接收"; break;
      case 3 : result.innerHTML = "3 : 请求处理中"; break;
      case 4 :
        if (xhr.status === 200) {
          var rawHtml = xhr.responseText;
      // var patt1 = new RegExp("<strong class=\"red\">(.*?)<","m");
      // var count = patt1.exec(rawHtml)[1];
      var patt2 = new RegExp("</span><a href=\"(.*?)\"","m");
      var url = "http://202.119.248.243:8080/opac/"+patt2.exec(rawHtml)[1];
      var patt3 = new RegExp("</span><a.*?>(.*?)</a>","m");
      var bookname = patt3.exec(rawHtml)[1];
          result.innerHTML = "<a href=\"" + url + "\">"+bookname+"</a>";
        }
        else if (xhr.status === 404) {
          result.innerHTML = "找不到请求的页面";
        }
        else {
          result.innerHTML = "无法处理的异常";
        }
        break;
      default :
        result.innerHTML = "这种情况不会出现";
    }
  }
  // 步骤三
  xhr.open("GET", "http://202.119.248.243:8080/opac/openlink.php?strSearchType=isbn&historyCount=1&strText="+isbn+"&x=11&y=15&doctype=ALL&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL", true);
  // 步骤四
  xhr.send();
}



