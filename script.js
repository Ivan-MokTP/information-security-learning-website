//>>>>> Fake Progress Bar >>>>>
time = 1500;

var fakeBar = document.getElementById('fake-bar')
var statusText = document.getElementById('status-text')

function ProgressBarAnimation(){
    
    if (fakeBar.style.width == "100%"){
        fakeBar.style.width = "0%";
        fakeBar.classList.remove("bg-danger")
        
    }

    $("#fake-bar").animate({
        width: "100%"
    }, time);    
    statusText.innerHTML = "Sending request to the server ..."

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
    
    // Access granted
    if (username == "admin" && password == ""){
        fakeBar.classList.add("bg-success")
        statusText.innerHTML = "Access granted.";
        document.getElementById('fade-text-1').innerHTML = "Congratulations! You have just gained access to our website.";
        document.getElementById('fade-text-2').innerHTML = "blablabla";

        TextFade();
    // Access denied
    } else {
        statusText.innerHTML = "Access denied!";
        fakeBar.classList.add("bg-danger")
        
    }
}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(){
    $("#fade-bg").fadeIn("slow", function(){
        $("#fade-text-1").delay(300).fadeIn("slow").delay(3000).fadeOut("slow", function(){
            $("#fade-text-2").fadeIn("slow").delay(3000);
        })
    })

}          


//<<<<< Text Fade <<<<<