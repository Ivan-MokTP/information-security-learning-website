
//>>>>> Fake Progress Bar >>>>>

var n = 28;
var time = 1000;
var progress = document.querySelector('.ProgressBar');
var dot = [];
var counter = 0;

for (var i = 0; i < n; i++) {
    dot[i] = document.createElement('div');
    dot[i].classList.add('ProgressDot');
    progress.appendChild(dot[i]);
}
//<<<<< Fake Progress Bar <<<<<
function ProgressBarAnimation(){
    var go = setInterval(function() {
        if (counter >= n) clearInterval(go);
        dot[counter].style.opacity = 1;
        counter++;
    }, time / n)
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, time);
    })
}

//<<<<< Fake Progress Bar <<<<<
//>>>>> Fake Connection >>>>>

async function CheckConnection(username, password){
    
    await ProgressBarAnimation();
    
    display = document.createElement('span');
    if (username == "admin" && password == "admin"){
        document.getElementById('ResultText').innerHTML = "Connected";
        document.getElementById('FadeText1').innerHTML = "Congratulations! You have just gained access to our website.";
        document.getElementById('FadeText2').innerHTML = "blablabla";
        
        TextFade();
        
    } else {
        document.getElementById('ResultText').innerHTML = "Invalid information";
    }
}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(){
    $(document).ready(function(){
        $("#FadeText1").delay(1000).fadeIn("slow").delay(3000).fadeOut("slow", function(){
            $("#FadeText2").fadeIn("slow").delay(3000);
        })       
    });
}          


//<<<<< Text Fade <<<<<