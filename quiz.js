
$('document').ready(function() {

	var answers = $('.answer');
	var trophy = $('.trophy:first');


	// Resets quiz variables and starts new game
	function startNewGame() {
		quiz.questionIndex = 0;
		quiz.score = 0;
		answers.off();
		answers.on('click', selectAnswer);
		$('.trophy').css('color', '');
		trophy = $('.trophy:first');
		displayQuestion();
	}


	function selectAnswer() {
		var clickable = false;
		var choice = $(this);
		answers.off();
		$('#newgame').off();
		if (choice.text() == quiz.getQuestion().answer) {
			trophy.css({'color': '#00eb00'});
			choice.css({'backgroundColor': '#00eb00', 'border': '#00eb00'});
			quiz.score++;
		} else {
			trophy.css({'color': '#ff3000'});
			choice.css({'backgroundColor': '#ff3000', 'border': '#ff3000'});
		}
		trophy = trophy.next();
		animationHandler(choice);
	}


	// Renders next question
	function displayQuestion() {
		var answer = $('.answer:first');
		var image = $('#photo');

		image.css('backgroundImage', 'url(' + quiz.getQuestion().image + ')');
		for (var i = 0; i < quiz.getQuestion().choices.length; i++) {
			answer.text(quiz.getQuestion().choices[i]);
			answer = answer.next();
		}
	}


	// Displays score at the end
	function displayScore() {
		var message = "";
		if (quiz.score <= 2) {
			message = "You only answered " + quiz.score + " question(s) correctly. Too bad...";
			$('#scoresheet p').css('color', '#ff0b00');
		}
		else if (quiz.score <= 4) {
			message = "You answered " + quiz.score + " questions correctly! Good job!";
		}
		else {
			message = "Golaso! You answered all " + quiz.questions.length + " questions correctly!";
		}
		$('#scoresheet h1').text(message);
		$('.background').show();
		$('#scoresheet').show();
	}


	function animationHandler(choice) {
		slideOutAnswers(choice);
		setTimeout(function() {
			quiz.questionIndex++;
			if (quiz.questionIndex < quiz.questions.length) {
				displayQuestion();
				slideInAnswers(choice);
			} else {
				displayScore();
			}
		}, 1000);
	}


	function slideOutAnswers(choice) {
		answers.not(choice).animate({opacity: 0, left: '+=50'}, 1000, function() {
			answers.css({'backgroundColor': '', 'border': ''});
		});
	}


	function slideInAnswers(choice) {
		var clickable = false;
		answers.not(choice).animate({opacity: 1, left: '-=50'}, 1000, function(){
			if (clickable == false) {
				answers.on('click', selectAnswer);
				$('#newgame').on('click', startNewGame);
				clickable = true;
			}
		});
	}



	/* -- Quiz and Question objects -- */



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



	/* Questions */
	var questions = [
		new Question("barzagli.jpg", ["Antonio Cassano", "Mesut Ozil", "Andrea Barzagli", "Andrea Pirlo"], "Andrea Barzagli"),
		new Question("vanpersie.jpg", ["Robin van Persie", "Marco Reus", "Sergio Busquets", "Wayne Rooney"], "Robin van Persie"),
		new Question("messi.jpg", ["Mario Balotelli", "James Rodriguez", "Cristiano Ronaldo", "Lionel Messi"], "Lionel Messi"),
		new Question("pogba.jpg", ["Paul Pogba", "Michael Carrick", "Blaise Matuidi", "Erik Lamela"], "Paul Pogba"),
		new Question("ibrahimovic.jpg", ["Theo Walcott", "Javier Pastore", "Zlatan Ibrahimovic", "Gianluigi Buffon"], "Zlatan Ibrahimovic")
	];

	var quiz = new Quiz(questions);
	startNewGame();
	$('#newgame').on('click', startNewGame);

});