// Slideup/Slidedown
var slideDownSection = document.getElementById("slidedown-section")
var slideUpSection = document.getElementById("slideup-section")

//>>>>> Section Slide >>>>>
function SectionSlide(){

    slideDownSection.classList.remove("hidden")

    $("#slideup-section").slideUp(1000, function(){
        $("#slidedown-section").slideDown();
    })

}

window.onload = function(){   
    if (localStorage.shortcut == "true"){
        document.getElementById("slideup-section").classList.add("hidden")
        document.getElementById("slidedown-section").classList.remove("hidden")
    } 
}
//<<<<< Section Slide <<<<<