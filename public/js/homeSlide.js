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
//<<<<< Section Slide <<<<<