// Register ---------------------------------------------------------------------------------------------------------------------------

function VerifyRegister(){
    var username = document.getElementById('usernameReg').value;
    var pw1 = document.getElementById('password1Reg').value;
    var pw2 = document.getElementById('password2Reg').value;

    var str = { "username": username, "password1": pw1, "password2": pw2 };
    var jsonStr = JSON.stringify(str);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            HandleRegisterStatus(result);
        }
    }
    xhr.open("POST", "/register?data="+jsonStr, true);
    xhr.send();
}

function ResetRegister(){
    document.getElementById('usernameReg').value = null;
    document.getElementById('password1Reg').value = null;
    document.getElementById('password2Reg').value = null;
}

function HandleRegisterStatus(result){

    var userField = document.getElementById('msg_user')
    var pw1Field = document.getElementById('msg_pw1')
    var pw2Field = document.getElementById('msg_pw2')

    //Reset status
    userField.innerHTML = "";
    pw1Field.innerHTML = "";
    pw2Field.innerHTML = "";

    switch(result.status){
        case 0:
            alert("Registration Complete! Now login again to access your account");
            window.location="/home.html";
            break;
        case 1:
            userField.innerHTML = 'Username already exists. Please choose a different username';
            break;
        case 2:
            userField.innerHTML = 'Username must be 3-20 characters long';
            break;
        case 3:
            pw1Field.innerHTML = 'Password must be 6-20 characters long';
            break;
        case 4:
            pw1Field.innerHTML = 'Confirm password does not match with password field';
            pw2Field.innerHTML = 'Confirm password does not match with password field';
            break;
        default:
            break;
    }   
}

// Login ------------------------------------------------------------------------------------------------------------------------------- 

function VerifyLogin(){
    var username = document.getElementById('usernameLog').value;
    var pw = document.getElementById('passwordLog').value;

    var str = {"username": username, "password": pw};
    var jsonStr = JSON.stringify(str);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            HandleLoginStatus(result);
        }
    }
    xhr.open("POST", "/login?data="+jsonStr, true);
    xhr.send();
}

function ResetLogin(){
    document.getElementById('usernameLog').value = null;
    document.getElementById('passwordLog').value = null;
}

function HandleLoginStatus(result){
    console.log(result);
    switch(result.status){
        case 0:
            alert("Login successful!");
            window.location="/home.html";
            break;
        case 1:
            alert("Username or password invalid. Please enter again")
            break;
        case 100:
            alert("Welcome back, admin!");
            window.location="/home.html";
        default:
            break;
    }
}

// Logout ---------------------------------------------------------------------------------------------------------------------------------------

function Logout(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            var result = JSON.parse(this.responseText);
            HandleLogoutStatus(result);
        }
    }
    xhr.open("GET", "/logout", true);
    xhr.send();
}

function HandleLogoutStatus(result){
    switch(result.status){
        case 0:
            alert("Logout successful!");
            //localStorage['isLogin'] = false;
            //localStorage['username'] = null;
            window.location="/home.html";
            break;
        default:
            break;
    }
}


