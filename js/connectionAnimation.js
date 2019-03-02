// Fake progress bar
connectTime = 1500;
var fakeBar = document.getElementById('fake-bar')
var statusText = document.getElementById('status-text')
var texts;

//>>>>> Fake Progress Bar >>>>>

function ProgressBarAnimation(){

    if (fakeBar.style.width == "100%"){
        fakeBar.style.width = "0%";
        fakeBar.classList.remove("bg-danger")

    }

    $("#fake-bar").animate({
        width: "100%"
    }, connectTime);    
    statusText.innerHTML = "Sending request to the server ..."

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, connectTime);
    })  
}
//<<<<< Fake Progress Bar <<<<<
//>>>>> Fake Connection >>>>>

async function CheckConnection(username, password){

    var sound = document.getElementById('sound-effect')

    await ProgressBarAnimation();


    display = document.createElement('span');

    // Access granted
    if (username == "admin" && password == "admin"){
        fakeBar.classList.add("bg-success")
        statusText.innerHTML = "Access granted! Redirecting you to the home page.<br>(From now on you can click on the top-left header to skip this part)";
        sound.src = "audio/Success.mp3"
        sound.play();
        localStorage["shortcut"] = false;
        setTimeout(function(){
            window.location="home.html";
        }, 5000)
        // Access denied
    } else {
        fakeBar.classList.add("bg-danger")
        statusText.innerHTML = "Access denied!"; 
        sound.src = "audio/Fail.mp3"
        sound.play();
        texts = [
            "You seem to have entered invalid information.",
            "Now try to login as an administrator",
            "Type both username and password as 'admin' and submit again"
        ]

        //Start fading text
        TextFade(texts);
    }

}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(texts){

    var currentText = document.getElementById('fade')

    currentText.innerHTML = texts[0];  
    var i = 1
    var timer = setInterval(function(){
        currentText.innerHTML = texts[i]
        i++
        if (i === texts.length){
            clearInterval(timer)
        }
    }, 3600) 
    $.each(texts, function(){ 
        $(".fade-text").delay(300).fadeIn(300).delay(3000)
    })
}       

//<<<<< Text Fade <<<<<