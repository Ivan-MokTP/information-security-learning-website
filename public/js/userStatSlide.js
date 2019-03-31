var bestAvg = document.getElementById('best-avg');

function slideBestAvg(element){
    if (element.checkOn){
        bestAvg.classList.remove("hidden");
        $(bestAvg).slideDown("slow");
    } else {
        bestAvg.classList.add("hidden");
        $(bestAvg).slideUp("slow");
    }
}