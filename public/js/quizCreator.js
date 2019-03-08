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
//<<<<< Quiz <<<<<