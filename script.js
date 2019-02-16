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

    await ProgressBarAnimation();
    

    display = document.createElement('span');
    
    // Access granted
    if (username == "admin" && password == ""){
        fakeBar.classList.add("bg-success")
        statusText.innerHTML = "Access granted.";
        //Remove connection panel
        $("#connection-panel").slideUp(2000)
        document.getElementById('fade-text-1').innerHTML = "Congratulations! You have just gained access to our website.";
        document.getElementById('fade-text-2').innerHTML = "You identifed yourself as an legitimate user, therefore you can access the content of this website";
        document.getElementById('fade-text-3').innerHTML = "This is called authentication"

    // Access denied
    } else {
        fakeBar.classList.add("bg-danger")
        statusText.innerHTML = "Access denied!";   
        document.getElementById('fade-text-1').innerHTML = "You seem to have entered invalid information.";
        document.getElementById('fade-text-2').innerHTML = "Now try to login as an administrator";
        document.getElementById('fade-text-3').innerHTML = "Type both username and password as 'admin' and submit again";
        
    }
    
    //Start fading text
    TextFade();
}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(){
    $("#fade-bg").fadeIn("slow", function(){
        $("#fade-text-1").delay(300).fadeIn("slow").delay(3000).fadeOut("slow", function(){
            $("#fade-text-2").fadeIn("slow").delay(3000).fadeOut("slow", function(){
                $("#fade-text-3").fadeIn("slow")
            })
        })
    })

}          

//<<<<< Text Fade <<<<<