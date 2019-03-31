// Slideup/Slidedown
var slideDownSection = document.getElementById("slidedown-section")
var slideUpSection = document.getElementById("slideup-section")

//>>>>> Section Slide >>>>>
function SectionSlide(){

    slideDownSection.classList.remove("hidden")

    $(slideUpSection).slideUp(1000, function(){
        $(slideDownSection).slideDown();
    })

}

window.onload = function(){   
    if (localStorage.shortcut == "true"){
        slideUpSection.classList.add("hidden")
        slideDownSection.classList.remove("hidden")
    } 
}
//<<<<< Section Slide <<<<<