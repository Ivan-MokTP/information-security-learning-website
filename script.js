//>>>>> Fake Progress Bar >>>>>
connectTime = 1500;

var fakeBar = document.getElementById('fake-bar')
var statusText = document.getElementById('status-text')
var texts;

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
    if (username == "admin" && password == ""){
        fakeBar.classList.add("bg-success")
        statusText.innerHTML = "Access granted.";
        sound.src = "audio/Success.mp3"
        sound.play();
        $("#connection-panel").slideUp(2000) //Remove connection panel
        /*
        document.getElementById('fade-text-1').innerHTML = "Congratulations! You have just gained access to our website.";
        document.getElementById('fade-text-2').innerHTML = "You identifed yourself as an legitimate user, therefore you can access the content of this website";
        document.getElementById('fade-text-3').innerHTML = "This is called authentication"
        */
        texts = [
            {
                text: "111",
                duration: 3000
            },
            {
                text: "222",
                duration: 3000
            }
        ]

        // Access denied
    } else {
        fakeBar.classList.add("bg-danger")
        statusText.innerHTML = "Access denied!"; 
        sound.src = "audio/Fail.mp3"
        sound.play();
        /*
        document.getElementById('fade-text-1').innerHTML = "You seem to have entered invalid information.";
        document.getElementById('fade-text-2').innerHTML = "Now try to login as an administrator";
        document.getElementById('fade-text-3').innerHTML = "Type both username and password as 'admin' and submit again";
        */
        texts = [
            {
                text: "AAA",
                duration: 3000
            },
            {
                text: "BBB",
                duration: 3000
            },
            {
                text: "CCC",
                duration: 3000
            }
        ]

    }

    //Start fading text
    TextFade(texts);
}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(texts){

    var currentText = document.getElementById('fade')

    $("#fade-bg").fadeIn("slow", function(){ 
        currentText.innerHTML = texts[0].text;  
        var i = 1
        var timer = setInterval(function(){
            currentText.innerHTML = texts[i].text
            i++
            if (i === texts.length){
                clearInterval(timer)
            }
        }, 3900) 
        $.each(texts, function(){ 
            $(".fade-text").delay(300).fadeIn(300).delay(this.duration).fadeOut(300)
        })
    })
}          

//<<<<< Text Fade <<<<<