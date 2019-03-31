//>>>>> Go To Home >>>>>
function GoToHome(){
    localStorage["shortcut"] = true;
    window.location = "/home.html"
}
//<<<<< Go To Home <<<<<

//>>>>> Request login status >>>>>
$(document).ready(function(){
    $('#topbar').load("/topbar.html", function(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200){
                var result = JSON.parse(this.responseText);


                var guestList = document.getElementById('guest');
                var memberList = document.getElementById('member');
                var adminList = document.getElementById('admin');
                var userTag = document.getElementById('user-tag');

                if (result.status == "member"){
                    memberList.classList.remove('hidden');
                    guestList.classList.add('hidden');
                    adminList.classList.add('hidden');
                    userTag.setAttribute("href", "/../Member/UserInfo.html")
                    userTag.innerHTML = result.username;
                } else if (result.status == "admin"){
                    adminList.classList.remove('hidden');
                    guestList.classList.add('hidden');
                    memberList.classList.add('hidden');
                } else {
                    memberList.classList.add('hidden');
                    adminList.classList.add('admin');
                    guestList.classList.remove('hidden');
                }
            }
        }
        xhr.open("GET", "/loginStatus", true);
        xhr.send();
    })
})

//<<<<< Request login status <<<<<