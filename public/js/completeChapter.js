var url = window.location.href;
var urlStr = url.replace("/", " ").trim().split("/");
console.log(urlStr);
var chapter = urlStr[urlStr.indexOf("Chapter") + 1];
var page = urlStr[urlStr.indexOf("Chapter") + 2];
var chapterNo;
var pageNo;

switch(chapter){
    case "IntroductionToAuthentication":
        chapterNo = 0;
        break;
    case "AuthenticationFactors":
        chapterNo = 1;
        break;
    case "SecureSocketLayer":
        chapterNo = 2;
        break;
    default:
        break;
}

switch(page){
    case "":
        pageNo = 1;
        break;
    case "2.html":
        pageNo = 2;
        break;
    case "3.html":
        pageNo = 3;
        break;
    default: 
        break;
}

console.log("Cahpter: "+chapterNo);
console.log("Page: "+pageNo);

var passStr = {"chapter": chapterNo, "page": pageNo}
var jsonStr = JSON.stringify(passStr);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(this.responseText);
    }
}
xhr.open("POST", "/completeChapter?data="+jsonStr, true);
xhr.send();