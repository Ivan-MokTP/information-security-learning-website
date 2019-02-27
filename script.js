// Fake progress bar
connectTime = 1500;
var fakeBar = document.getElementById('fake-bar')
var statusText = document.getElementById('status-text')
var texts;

// Slideup/Slidedown in home page
var slideDownSection = document.getElementById("slidedown-section")
var slideUpSection = document.getElementById("slideup-section")

//>>>>> Load Top Bar >>>>>
var topbar = document.getElementById('topbar')
$('#topbar').load("topbar.htm")
//<<<<< Load Top Bar <<<<<
//>>>>> Fake Progress Bar >>>>>

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

    var sound = document.getElementById('sound-effect')

    await ProgressBarAnimation();


    display = document.createElement('span');

    // Access granted
    if (username == "admin" && password == "admin"){
        fakeBar.classList.add("bg-success")
        statusText.innerHTML = "Access granted! Redirecting you to the home page.<br>(From now on you can click on the top-left header to skip this part)";
        sound.src = "audio/Success.mp3"
        sound.play();
        localStorage["shortcut"] = false;
        setTimeout(function(){
            window.location="home.htm";
        }, 5000)
        // Access denied
    } else {
        fakeBar.classList.add("bg-danger")
        statusText.innerHTML = "Access denied!"; 
        sound.src = "audio/Fail.mp3"
        sound.play();
        texts = [
            "You seem to have entered invalid information.",
            "Now try to login as an administrator",
            "Type both username and password as 'admin' and submit again"
        ]

        //Start fading text
        TextFade(texts);
    }

}

//<<<<< Fake Connection <<<<<
//>>>>> Text Fade >>>>>

function TextFade(texts){

    var currentText = document.getElementById('fade')

    $("#fade-bg").fadeIn("slow", function(){ 
        currentText.innerHTML = texts[0];  
        var i = 1
        var timer = setInterval(function(){
            currentText.innerHTML = texts[i]
            i++
            if (i === texts.length){
                clearInterval(timer)
            }
        }, 3900) 
        $.each(texts, function(){ 
            $(".fade-text").delay(300).fadeIn(300).delay(3000).fadeOut(300)
        })
    })
}       

//<<<<< Text Fade <<<<<
//>>>>> Section Slide >>>>>
function SectionSlide(){

    slideDownSection.classList.remove("hidden")

    $("#slideup-section").slideUp(1000, function(){
        $("#slidedown-section").slideDown();
    })

}
//<<<<< Section Slide <<<<<
//>>>>> Go To Home >>>>>

function GoToHome(){
    localStorage["shortcut"] = true;
    window.location = "home.htm"
}

window.onload = function(){   
    if (localStorage.shortcut == "true"){
        document.getElementById("slideup-section").classList.add("hidden")
        document.getElementById("slidedown-section").classList.remove("hidden")
    } 
}

//<<<<< Go To Home <<<<<
//>>>>> Quiz >>>>>

var myQuestions = [
	{
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
		question: "Which of the following statement is FALSE about SSL?",
		answers: {
			A: 'The letter \'s\' in HTTPS stands for \'secure\'',
			B: 'Mutual Authentication requires both Server Authentication and Client Authentication',
			C: 'The session generated is the same for both entities',
            D: 'For normal SSL, only Client Authentication is needed to generate the session key'
		},
		correctAnswer: 'D'
	}
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for(var i=0; i<questions.length; i++){
			
			// first reset the list of answers
			answers = [];

			// for each available answer...
			for(letter in questions[i].answers){

				// ...add an html radio button
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'"> '
						+ letter + ') '
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="list-group-item"><div class="question">Q' + (i+1) + '. ' + questions[i].question + '</div>'
				+ '<br><div class="answers" style="font-size:17px">' + answers.join('<br>') + '</div></div><br>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
		
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		
		// for each question...
		for(var i=0; i<questions.length; i++){

			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			// if answer is correct
			if(userAnswer===questions[i].correctAnswer){
				// add to the number of correct answers
				numCorrect++;
				
				// color the answers green
				answerContainers[i].style.color = 'lightgreen';
			}
			// if answer is wrong or blank
			else{
				// color the answers red
				answerContainers[i].style.color = 'red';
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML = 'Score: ' + numCorrect + ' out of ' + questions.length;
	}

	// show questions right away
	showQuestions(questions, quizContainer);
	
	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}

}


