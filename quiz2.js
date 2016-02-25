
$('document').ready(function() {


	var answers = $('.answer');


	// removes event listeners and evaluates clicked answer
	function selectAnswer() {
		var choice = $(this);
		console.log('Hi');
		answers.off();
		if (choice.text() == quiz.getQuestion().answer) {
			animateAnswers(choice, true);
			quiz.score++;
		} else {
			animateAnswers(choice, false);
		}
	}


	// combine with selectAnswer into one function???
	function animateAnswers(choice, correct) {
		console.log('next question');
		if (correct) {
			choice.css({'backgroundColor': '#00eb00', 'border': '#00eb00'})
		} else {
			choice.css({'backgroundColor': '#ff3000', 'border': '#ff3000'});
		}
		fadeOutAnswers(choice);
		setTimeout(function() {
			nextQuestion(choice);
		}, 1000);
	}





	// checks for next question, if one exists animates it in,
	// if not displays score

	function nextQuestion(choice) {
		quiz.questionIndex++;
		if (quiz.questionIndex < quiz.questions.length) {
			displayQuestion();
			fadeInAnswers(choice);
		} else {
			quiz.displayScore();
		}
	}




	// fades out all unchosen answers

	function fadeOutAnswers(choice) {
		answers.not(choice).animate({opacity: 0, left: '+=50'}, 1000, function() {
			answers.css({'backgroundColor': '', 'border': ''});
		});
	}





	// fades answers back in and assigns event listeners to each

	function fadeInAnswers(choice) {
		var clickable = false;
		answers.not(choice).animate({opacity: 1, left: '-=50'}, 1000, function(){
			if (clickable == false) {
				answers.on('click', quiz.selectAnswer);
				clickable = true;
			}
		});
	}




	// displays user's ending score

	function displayScore() { /* (element id) */
		var message = "";
		if (this.score <= 2) {
			message = "You only answered " + this.score + " question(s) correctly. Too bad...";
			$('#scoresheet p').css('color', '#ff0b00');
		}
		else if (this.score >= 3) {
			message = "You answered " + this.score + " questions correctly! Good job!";
		}
		else {
			message = "Golaso! You answered all " + this.questions.length + " questions correctly!";
		}
		$('#scoresheet h1').text(message);
		$('.background').show();
		$('#scoresheet').show();
	}








	function Question(image, choices, answer) {
		this.image = image;
		this.choices = choices;
		this.answer = answer;
	}


	function Quiz(questions) {
		this.questions = questions;
		this.questionIndex = 0;
		this.score = 0;
	}

	Quiz.prototype.getQuestion = function() {
		return this.questions[this.questionIndex];
	}



	Quiz.prototype.startNewGame = function() {
		this.questionIndex = 0;
		this.score = 0;

		displayQuestion();
		answers.off();
		answers.on('click', selectAnswer);
		$('.trophy').css('color', '');
	}




	function displayQuestion() {
		var answer = $('.answer:first');
		var image = $('#photo');
		image.css('backgroundImage', 'url(' + quiz.getQuestion().image + ')');
		for (var i = 0; i < quiz.getQuestion().choices.length; i++) {
			answer.text(quiz.getQuestion().choices[i]);
			answer = answer.next();
		}
	}





	/* Questions */
	var questions = [
		new Question("barzagli.jpg", ["Antonio Cassano", "Mesut Ozil", "Andrea Barzagli", "Andrea Pirlo"], "Andrea Barzagli"),
		new Question("vanpersie.jpg", ["Robin van Persie", "Marco Reus", "Sergio Busquets", "Wayne Rooney"], "Robin van Persie"),
		new Question("messi.jpg", ["Mario Balotelli", "James Rodriguez", "Cristiano Ronaldo", "Lionel Messi"], "Lionel Messi"),
		new Question("pogba.jpg", ["Paul Pogba", "Michael Carrick", "Blaise Matuidi", "Erik Lamela"], "Paul Pogba"),
		new Question("ibrahimovic.jpg", ["Theo Walcott", "Javier Pastore", "Zlatan Ibrahimovic", "Gianluigi Buffon"], "Zlatan Ibrahimovic")
	];

	var quiz = new Quiz(questions);
	quiz.startNewGame();
	$('#newgame').on('click', quiz.startNewGame);

});






