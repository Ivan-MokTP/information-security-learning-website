window.onload = function(){
    ChapterCompleteness();
    QuizStat();
    QuizLeaderBoard();
}

// >>>>> Chapter Progress >>>>>
function ChapterCompleteness(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            ShowProgress(result);

        }
    }
    xhr.open("POST", "/adminChapter", true);
    xhr.send();

    function ShowProgress(result){
        
        var userCount = result[0][0].userCount;

        var ch0 = document.getElementById('ch0');
        var ch1 = document.getElementById('ch1');
        var ch2 = document.getElementById('ch2');
        var overall = document.getElementById('overall');

        var ch0Value = Math.round((result[1][0].count/(userCount*2))*100)+"%";
        var ch1Value = Math.round((result[1][1].count/(userCount*2))*100)+"%";
        var ch2Value = Math.round((result[1][2].count/(userCount*3))*100)+"%";
        var overallValue = Math.round(((result[1][0].count+result[1][1].count+result[1][2].count)/(7*userCount))*100)+"%";

        ch0.style.width = ch0Value;
        ch0.innerHTML = ch0Value;
        ch1.style.width = ch1Value;
        ch1.innerHTML = ch1Value;
        ch2.style.width = ch2Value;
        ch2.innerHTML = ch2Value;
        overall.style.width = overallValue;
        overall.innerHTML = overallValue;
    }

}

// <<<<< Chapter Progress <<<<<

// >>>>> Quiz Stat >>>>>

function QuizStat(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            DisplayQuiz(result);

        }
    }
    xhr.open("POST", "/adminQuizStat", true);
    xhr.send();

    function DisplayQuiz(result){

        var quizTable = document.getElementById('quiz-stat');

        var tableBlock = [];
        tableBlock.push(
            '<tr>'
            +'<td class="italic">Easy</td>'
            +'<td>'+Math.round(result[0].count,-1)+'</td>'
            +'<td>'+Math.round(result[0].avg,-1)+'</td>'
            +'</tr>'
            +'<tr>'
            +'<td class="italic">Normal</td>'
            +'<td>'+Math.round(result[1].count,-1)+'</td>'
            +'<td>'+Math.round(result[1].avg,-1)+'</td>'
            +'</tr>'
            +'<tr>'
            +'<td class="italic">Hard</td>'
            +'<td>'+Math.round(result[2].count,-1)+'</td>'
            +'<td>'+Math.round(result[2].avg,-1)+'</td>'
            +'</tr>'
        );
        quizTable.innerHTML = tableBlock;
    }
}

// <<<<< Quiz Stat <<<<<


// >>>>> Quiz LeaderBoard >>>>>

function QuizLeaderBoard(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            ShowLeaderBoard(result);

        }
    }
    xhr.open("POST", "/adminQuizLeaderBoard", true);
    xhr.send();

    function ShowLeaderBoard(result){

        var lbEasy = document.getElementById('lb-easy');
        var lbNormal = document.getElementById('lb-normal');
        var lbHard = document.getElementById('lb-hard');


        //Easy
        var trBlock = []
        trBlock[0] = []
        trBlock[1] = []
        trBlock[2] = []
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < result[i].length; j++){
                if (j < 5){
                    trBlock[i].push(
                        '<tr>'
                        +'<td>'+(j+1)+'</td>'
                        +'<td>'+result[i][j].username+'</td>'
                        +'<td>'+result[i][j].avg+'</td>'
                        +'<td>'+result[i][j].count+'</td>'
                        +'</tr>'
                    )
                } else {
                    break;
                }
            }
        }

        lbEasy.innerHTML = trBlock[0].join('');
        lbNormal.innerHTML = trBlock[1].join('');
        lbHard.innerHTML = trBlock[2].join('');
    }
}

// <<<<< Quiz LeaderBoard <<<<<

// >>>>> Quiz Chart >>>>>

function QuizChart(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(this.responseText);
            console.log(result);

        }
    }
    xhr.open("POST", "/adminQuizLeaderBoard", true);
    xhr.send();

    function ShowQuizChart(result){

    }
}

// <<<<< Quiz Chart <<<<<