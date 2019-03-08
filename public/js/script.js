//>>>>> Load Top Bar >>>>>
$('#topbar').load("/topbar.html")
//<<<<< Load Top Bar <<<<<

//>>>>> Go To Home >>>>>
function GoToHome(){
    localStorage["shortcut"] = true;
    window.location = "/home.html"
}

window.onload = function(){   
    if (localStorage.shortcut == "true"){
        document.getElementById("slideup-section").classList.add("hidden")
        document.getElementById("slidedown-section").classList.remove("hidden")
    } 
}
//<<<<< Go To Home <<<<<