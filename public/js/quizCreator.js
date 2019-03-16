//>>>>> Quiz >>>>>

/*
Type 0 - MC
Tpye 1 - True/False
Type 2 - Multi-MC
Type 3 - Fill-in-the-blank
*/
var quizQuestions = [
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
        question: "Which of the following is NOT a class of Authentication Factor?",
        answers: {
            A: 'Consensus Factor',
            B: 'Ownership Factor',
            C: 'Knowledge Factor',
            D: 'Inherence Factor'
        },
        correctAnswer: 'A'
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
    },
    {
        type: 3,
        question: "The /'s/' in HTTP/'S/' stands for _____.",
        correctAnswer: ['aa', 'bbbbb', 'ccccccccc']
    }
];

var quizContainer = document.getElementById('quiz');
var resultContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(quizQuestions, quizContainer, resultContainer, submitButton);

function generateQuiz(quizQuestions, quizContainer, resultContainer, submitButton){

    showQuestion(quizQuestions, quizContainer);

    function showQuestion(quizQuestions, quizContainer){

        var questionBlock = [];

        //For each question
        for (var i=0; i<8; i++){
            var answerBlock = [];
            switch(quizQuestions[i].type){
                    //MC
                case 0:

                    //For each answer
                    for (ans in quizQuestions[i].answers){
                        answerBlock.push(
                            '<label><input type="radio" name="'+i+'" value="'+ans+'"/> '+ans+') '+quizQuestions[i].answers[ans]+'</label><br>');
                    }
                    break;
                    //TorF
                case 1:
                    answerBlock.push(
                        '<label><input type="radio" name="'+i+'" value="True"> True</label><br>'
                        +'<label><input type="radio" name="'+i+'" value="False"> False</label><br>'
                    );
                    break;
                    //Multi-MC
                case 2:
                    for (ans in quizQuestions[i].answers){
                        answerBlock.push(
                            '<label><input type="checkbox" name="'+i+'" value="'+ans+'"/> '+ans+') '+quizQuestions[i].answers[ans]+'</label><br>');
                    }
                    break;
                    //Fill-in-the-blanks
                case 3:
                    for (var j=0; j < quizQuestions[i].correctAnswer.length; j++){
                        answerBlock.push(
                            '<input class="fitb" type="text" name="'+i+j+'" size="10"/>'
                        );
                    }

                    break;
            }
            //Add all answers into the block
            questionBlock.push('<div class="list-group-item"><div>Q'+(i+1)+'. '+quizQuestions[i].question+'</div><br><div>'+answerBlock.join('')+'</div></div><br>');

        }
        //All whole quiz into html
        quizContainer.innerHTML = questionBlock.join('');
    }
    
    submitButton.onclick = function(){
		showResult(quizQuestions, quizContainer, resultContainer);
	}
    
    function showResult(quizQuestions, quizContainer, resultContainer){
        var score = 0;
        var userAnswer = '';
        //For each question
        for (var i=0; i<8; i++){
            switch(quizQuestions[i].type){
                    //MC & TorF
                case 0:
                case 1:
                    userAnswer = quizContainer.querySelector('input[name="'+i+'"]:checked').value;
                    console.log(userAnswer);
                    if(userAnswer === quizQuestions[i].correctAnswer){
                        score++;
                        //document.getElementById('label'+i+)
                        console.log("Q"+(i+1)+": Correct");
                    } else {
                        console.log("Q"+(i+1)+": Wrong");
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
                        console.log("Q"+(i+1)+": Correct");
                    } else {
                        console.log("Q"+(i+1)+": Wrong");
                    }
            }
        }
    }
}





//<<<<< Quiz <<<<<