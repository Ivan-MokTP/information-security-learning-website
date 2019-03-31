//>>>>> Quiz >>>>>

/*
Type 0 - MC
Tpye 1 - True/False
Type 2 - Multi-MC
Type 3 - Fill-in-the-blank
*/
var easyQuestion = [
    {
        type: 0,
        question: "Which of the follow is NOT an authentication factor?",
        answers: {
            A: 'Fingerprint',
            B: 'Eye Retina',
            C: 'Password',
            D: 'Skin pattern'
        },
        correctAnswer: 'D'
    },
    {
        type: 0,
        question: "Which of the following about Authentication is TRUE?",
        answers: {
            A: 'Single Factor Authentication provides more security than Two Factor Authentication',
            B: 'Authentication is the process of proving one\'s identity',
            C: 'Authentication is rarely applied in today\s network',
            D: 'Authenticated user only have to login once, then he can access the information next time without logging in'
        },
        correctAnswer: 'B'
    },
    {
        type: 1,
        question: "Example t/f",
        correctAnswer: 'True'
    },
    {
        type: 2,
        question: "Multi-MC",
        answers: {
            A: 'T',
            B: 'F',
            C: 'T',
            D: 'T',
            E: 'F'
        },
        correctAnswer: ['A', 'C', 'D']
    }
];

var normalQuestion = [
    {
        type: 0,
        question: "Which of the following statement is FALSE about SSL?",
        answers: {
            A: 'The letter \'s\' in HTTPS stands for \'secure\'',
            B: 'Mutual Authentication requires both Server Authentication and Client Authentication',
            C: 'The session generated is the same for both entities',
            D: 'For normal SSL, only Client Authentication is needed to generate the session key'
        },
        correctAnswer: 'D'
    },
    {
        type: 3,
        question: "The /'s/' in HTTP/'S/' stands for _____.",
        correctAnswer: ['aa', 'bbb', 'cccc']
    },
    {
        type: 0,
        question: "Which of the following is NOT a class of Authentication Factor?",
        answers: {
            A: 'Consensus Factor',
            B: 'Ownership Factor',
            C: 'Knowledge Factor',
            D: 'Inherence Factor'
        },
        correctAnswer: 'A'
    }
]

var hardQuestion = [
    {
        type: 0,
        question: "In normal SSL, what does server have to provide to client during initial communication?",
        answers: {
            A: 'Client\'s certificate & server\'s private key',
            B: 'Server\'s public key only',
            C: 'Server\'s certificate and server\'s public key',
            D: 'Client\'s certificates & server\'s public key'
        },
        correctAnswer: 'C'
    },
    {
        type: 0,
        question: "Which of the following statement is FALSE about SSL?",
        answers: {
            A: 'The letter \'s\' in HTTPS stands for \'secure\'',
            B: 'Mutual Authentication requires both Server Authentication and Client Authentication',
            C: 'The session generated is the same for both entities',
            D: 'For normal SSL, only Client Authentication is needed to generate the session key'
        },
        correctAnswer: 'D'
    },
]

var quizContainer = document.getElementById('quiz');
var resultContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var submitDiv = document.getElementById('submit-div');
var againButton = document.getElementById('again');

var easyButton = document.getElementById('quizEasy');
var normalButton = document.getElementById('quizNormal');
var hardButton = document.getElementById('quizHard');

easyButton.onclick = function(){
    generateQuiz(easyQuestion, quizContainer, resultContainer, submitButton, 'Easy');
}

normalButton.onclick = function(){
    generateQuiz(normalQuestion, quizContainer, resultContainer, submitButton, 'Normal');
}

hardButton.onclick = function(){
    generateQuiz(hardQuestion, quizContainer, resultContainer, submitButton, 'Hard');
}

function generateQuiz(quizQuestions, quizContainer, resultContainer, submitButton, difficulty){

    //Disable quiz chooser
    document.getElementById('quizChooser').style.display = 'none';
    var prefix = [];
    prefix.push('<div class="list-group-item">Difficulty: <font class="bold italic">'+difficulty+'</font></div>');
    
    submitDiv.classList.remove('hidden');

    var numOfQuestion = 2;

    //Randomize quiz
    for (var i=quizQuestions.length-1;i>0;i--){
        var j = Math.floor(Math.random()*(i+1));
        var temp = quizQuestions[i];
        quizQuestions[i] = quizQuestions[j];
        quizQuestions[j] = temp;
    }

    showQuestion(quizQuestions, quizContainer);

    function showQuestion(quizQuestions, quizContainer){

        var questionBlock = [];

        //For each question
        for (var i=0; i<numOfQuestion; i++){
            var answerBlock = [];
            switch(quizQuestions[i].type){
                    //MC
                case 0:

                    //For each answer
                    for (ans in quizQuestions[i].answers){
                        answerBlock.push(
                            '<label><input type="radio" name="'+i+'" value="'+ans+'" required/> '+ans+') '+quizQuestions[i].answers[ans]+'</label><br>');
                    }
                    break;
                    //TorF
                case 1:
                    answerBlock.push(
                        '<label><input type="radio" name="'+i+'" value="True" required> True</label><br>'
                        +'<label><input type="radio" name="'+i+'" value="False" required> False</label><br>'
                    );
                    break;
                    //Multi-MC
                case 2:
                    for (ans in quizQuestions[i].answers){
                        answerBlock.push(
                            '<label><input type="checkbox" name="'+i+'" value="'+ans+'" required/> '+ans+') '+quizQuestions[i].answers[ans]+'</label><br>');
                    }
                    break;
                    //Fill-in-the-blanks
                case 3:
                    for (var j=0; j < quizQuestions[i].correctAnswer.length; j++){
                        answerBlock.push(
                            '<input class="fitb" type="text" name="'+i+j+'" size="10" required/>'
                        );
                    }

                    break;
            }
            //Add all answers into the block
            questionBlock.push('<div class="list-group-item" id="Q'+i+'"><div>Q'+(i+1)+'. '+quizQuestions[i].question+'</div><br><div>'+answerBlock.join('')+'</div></div><br>');

        }
        //All whole quiz into html
        quizContainer.innerHTML = prefix+questionBlock.join('');
    }

    submitButton.onclick = function(){
        showResult(quizQuestions, quizContainer, resultContainer, difficulty);
    }

    function showResult(quizQuestions, quizContainer, resultContainer, difficulty){
        var score = 0;
        var userAnswer = '';
        //For each question
        for (var i=0; i<numOfQuestion; i++){
            switch(quizQuestions[i].type){
                    //MC & TorF
                case 0:
                case 1:
                    userAnswer = quizContainer.querySelector('input[name="'+i+'"]:checked').value;
                    console.log(userAnswer);

                    if(userAnswer === quizQuestions[i].correctAnswer){
                        score++;
                        document.getElementById('Q'+i).style.color = 'springgreen';
                    } else {
                        document.getElementById('Q'+i).style.color = 'red';
                    }
                    break;
                    //Multi-MC
                case 2:
                    userAnswer = [];
                    var checkList = quizContainer.querySelectorAll('input[name="'+i+'"]:checked');
                    for (var j=0; j< checkList.length; j++){
                        userAnswer[j] = checkList[j].value;
                    }
                    if (userAnswer.join() == quizQuestions[i].correctAnswer.join()){
                        score++;
                        document.getElementById('Q'+i).style.color = 'springgreen';
                    } else {
                        document.getElementById('Q'+i).style.color = 'red';
                    }
                    break;
                    //FITB
                case 3:
                    userAnswer = [];
                    var blanks = quizContainer.querySelectorAll('input[class="fitb"]');
                    for (var j=0; j< blanks.length; j++){
                        userAnswer[j] = blanks[j].value;
                    }
                    if (userAnswer.join() == quizQuestions[i].correctAnswer.join()){
                        score++;
                        document.getElementById('Q'+i).style.color = 'springgreen';
                    } else {
                        document.getElementById('Q'+i).style.color = 'red';
                    }
                    break;
            }
        }

        submitDiv.classList.add('hidden');
        againButton.classList.remove('hidden');
        resultContainer.classList.remove('hidden');

        //Score options
        var scorePercentage = (score/numOfQuestion);
        var hue = ((scorePercentage)*120).toString(10);
        var scoreColor = ["hsl(",hue,",100%,50%)"].join("");

        //Date options
        var dateOption = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        var now = new Date().toLocaleDateString("en-US", dateOption);

        //>>>>> XML request >>>>>

        var str = {"difficulty": difficulty, "score": scorePercentage*100}
        var jsonStr = JSON.stringify(str);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200){
                var result = JSON.parse(this.responseText);
                console.log(result)
            }
        }
        xhr.open("POST", "/completeQuiz?data="+jsonStr, true);
        xhr.send();
        
        //<<<<< XML request <<<<<

        document.getElementById('attemptContainer').innerHTML = "#1";
        document.getElementById('scoreContainer').innerHTML = score+"/"+numOfQuestion;
        document.getElementById('scoreContainer').style.color = scoreColor;
        document.getElementById('timeContainer').innerHTML = now;
    }
}

function Again(){
    window.location.reload();
}

//<<<<< Quiz <<<<<