//>>>>> Load Top Bar >>>>>
$('#topbar').load("/topbar.html")
//<<<<< Load Top Bar <<<<<

//>>>>> Go To Home >>>>>
function GoToHome(){
    localStorage["shortcut"] = true;
    window.location = "/home.html"
}
//<<<<< Go To Home <<<<<