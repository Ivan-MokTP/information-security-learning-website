// >>>>> Chapter Progress >>>>>

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){
        var result = JSON.parse(this.responseText);
        displayProgress(result);

    }
}
xhr.open("POST", "/adminQuizStat", true);
xhr.send();

function displayProgress(result){

    var user = document.getElementById('user-tag-title');

    user.innerHTML = result.username+"'s User Profile";

    var ch0 = document.getElementById('ch0');
    var ch1 = document.getElementById('ch1');
    var ch2 = document.getElementById('ch2');
    var overall = document.getElementById('overall');

    var ch0Value = Math.round((result.c0/2)*100)+"%";
    var ch1Value = Math.round((result.c1/2)*100)+"%";
    var ch2Value = Math.round((result.c2/3)*100)+"%";
    var overallValue = Math.round(((result.c0+result.c1+result.c2)/7)*100)+"%";

    ch0.style.width = ch0Value;
    ch0.innerHTML = ch0Value;
    ch1.style.width = ch1Value;
    ch1.innerHTML = ch1Value;
    ch2.style.width = ch2Value;
    ch2.innerHTML = ch2Value;
    overall.style.width = overallValue;
    overall.innerHTML = overallValue;
}

// <<<<< Chapter Progress <<<<<

// >>>>> Quiz Stat >>>>>

var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function(){
    if (xhr2.readyState == 4 && xhr2.status == 200){
        var result = JSON.parse(this.responseText);
        displayQuiz(result);

    }
}
xhr2.open("POST", "/userQuizStat", true);
xhr2.send();

function displayQuiz(result){

    var quizTable = document.getElementById('quiz-stat');

    var tableBlock = [];
    tableBlock.push(
        '<tr>'
        +'<td class="italic">Easy</td>'
        +'<td>'+result[0].count+'</td>'
        +'<td>'+result[0].avg+'</td>'
        +'</tr>'
        +'<tr>'
        +'<td class="italic">Normal</td>'
        +'<td>'+result[1].count+'</td>'
        +'<td>'+result[1].avg+'</td>'
        +'</tr>'
        +'<tr>'
        +'<td class="italic">Hard</td>'
        +'<td>'+result[2].count+'</td>'
        +'<td>'+result[2].avg+'</td>'
        +'</tr>'
    );
    quizTable.innerHTML = tableBlock;
}

// <<<<< Quiz Stat <<<<<