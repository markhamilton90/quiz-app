
$('document').ready(function() {


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


	Quiz.prototype.startNewGame = function() { /* (elements) */
		quiz.questionIndex = 0;
		quiz.score = 0;
		// elements.off();
		// elements.on('click', this.selectAnswer);
		$('.answer').off();
		$('.answer').on('click', this.selectAnswer);
		$('.trophy').css('color', '');
		quiz.displayQuestion();
	}


	Quiz.prototype.getQuestion = function() {
		return this.questions[this.questionIndex];
	}


	Quiz.prototype.selectAnswer = function() {
		var answers = $('.answer');
		var choice = $(this);
		answers.off();

		if (choice.text() == quiz.getQuestion().answer) {
			console.log('correct! : ' + quiz.score);
			quiz.animateAnswers(choice, true);
			quiz.score++;
		} else {
			console.log('wrong! : ' + choice.text());
			quiz.animateAnswers(choice, false);
		}
	}


	Quiz.prototype.animateAnswers = function(choice, correct) {
		var answers = $('.answer');
		var clickable = false;
		// highlight choice based on correctness
		if (correct) {
			choice.css({'backgroundColor': '#00eb00', 'border': '#00eb00'})
		} else {
			choice.css({'backgroundColor': '#ff3000', 'border': '#ff3000'});
		}
		// slide other answers off screen
		answers.not(choice).animate({opacity: 0, left: '+=50'}, 1000, function() {
			answers.css({'backgroundColor': '', 'border': ''});
		});
		// simultaneously increment index, change answer text, and begin slideIn animation
		setTimeout(function() {
			quiz.questionIndex++;
			if (quiz.questionIndex < quiz.questions.length) {
				quiz.displayQuestion();
				answers.not(choice).animate({opacity: 1, left: '-=50'}, 1000, function(){
					if (clickable == false) {
						answers.on('click', quiz.selectAnswer);
						clickable = true;
					}
				}); 
			} else {
				quiz.displayScore();
			}
		}, 1000);
	}


	Quiz.prototype.displayScore = function() { /* (element id) */
		var message = "";
		if (this.score <= 2) {
			message = "You only answered " + this.score + " question(s) correctly. Too bad...";
			$('#scoresheet p').css('color', '#ff0b00');
		}
		else if (this.score <= 4) {
			message = "You answered " + this.score + " questions correctly! Good job!";
		}
		else {
			message = "Golaso! You answered all " + this.questions.length + " questions correctly!";
		}
		$('#scoresheet h1').text(message);
		// (element).text(message);
		$('.background').show();
		$('#scoresheet').show();
	}


	Quiz.prototype.displayQuestion = function() { /* (answerElement, imageElement) */
		// var answer = answerElement
		// var image = imageElement
		var answer = $('.answer:first');
		var image = $('#photo');

		// should I make this a separate function???
		image.css('backgroundImage', 'url(' + quiz.getQuestion().image + ')');
		for (var i = 0; i < this.getQuestion().choices.length; i++) {
			answer.text(this.getQuestion().choices[i]);
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






