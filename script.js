//>>>>> Fake Progress Bar >>>>>
connectTime = 1500;

var fakeBar = document.getElementById('fake-bar')
var statusText = document.getElementById('status-text')

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
    var texts;

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
            "AAA",
            "BBB",
            "CCC"
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
            "111",
            "222",
            "333"
        ]
        
    }
    
    //Start fading text
    TextFade(texts);
}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(texts){
    /*
    $("#fade-bg").fadeIn("slow", function(){
        $("#fade-text-1").delay(300).fadeIn("slow").delay(3000).fadeOut("slow", function(){
            $("#fade-text-2").fadeIn("slow").delay(3000).fadeOut("slow", function(){
                $("#fade-text-3").fadeIn("slow")
            })
        })
    })
    */
    var text = document.getElementsByClassName("fade-text");
    
    $("#fade-bg").fadeIn("slow", function(){
        $.each(texts, function(index, value){
            text.innerHTML = value;
            $(".fade-text").fadeIn("slow", function(){
                var nxt = texts.next
            })
        
    })

}          

//<<<<< Text Fade <<<<<