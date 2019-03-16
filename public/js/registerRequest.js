function Verify(){
    var username = document.getElementById('username').value;
    var pw1 = document.getElementById('password1').value;
    var pw2 = document.getElementById('password2').value;
    
    var str = { "username": username, "password1": pw1, "password2": pw2 };
    var jsonStr = JSON.stringify(str);
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = this.responseText;
            alert(result);
        }
    }
    xhr.open("POST", "/register?data="+jsonStr, true);
    xhr.send();
}

function Reset(){
    document.getElementById('username').value = null;
    document.getElementById('password1').value = null;
    document.getElementById('password2').value = null;
}