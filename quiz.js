$('document').ready(function(){

	var answerElements = $('li.answer');
	var rightAnswer = "Andrea Barzagli";
	var answer = $('.answer:first');
	var correctAnswerText;
	var correctAnswer;
	var round = 0;
	var correct = 0;
	var incorrect = 0;
	var photo = $('#photo');
	var trophy = $('.trophy:first');

	var quiz = [{
		answers: ["Antonio Cassano", "Mesut Ozil", "Andrea Barzagli", "Andrea Pirlo"],
		correct: "Andrea Barzagli",
		image: "barzagli.jpg"
	},
	{
		answers: ["Robin van Persie", "Marco Reus", "Sergio Busquets", "Wayne Rooney"],
		correct: "Robin van Persie",
		image: "vanpersie.jpg"
	}, 
	{
		answers: ["Mario Balotelli", "James Rodriguez", "Cristiano Ronaldo", "Lionel Messi"],
		correct: "Lionel Messi",
		image: "messi.jpg"
	}, 
	{
		answers: ["Paul Pogba", "Michael Carrick", "Blaise Matuidi", "Erik Lamela"],
		correct: "Paul Pogba",
		image: "pogba.jpg"
	}, 
	{
		answers: ["Theo Walcott", "Javier Pastore", "Zlatan Ibrahimovic", "Gianluigi Buffon"],
		correct: "Zlatan Ibrahimovic",
		image: "ibrahimovic.jpg"
	}];

	getCorrectAnswer(rightAnswer);

	$('.answer').on("click", function(){
		if (this.innerHTML == correctAnswerText){
			guessedRight($(this));
		} else {
			guessedWrong($(this));
		}
	});

	function guessedRight(userAnswer) {
		//$('.answer').off();
		userAnswer.css({'background-color': '#00eb00', 'border': '#00eb00'});
		$('.answer').not(userAnswer).animate({
			opacity: 0,
			left: "+=50"
		}, 1000, function(){
			console.log(round);
			if (round < 5)
				populate(round);
			$('.answer').css({'background-color': '', 'border': ''});
			$('.answer:hover').css({'background-color': '',
				'border': ''});
		});
		round++;
		trophy.css('color', '#00eb00');
		trophy = trophy.next();
		if (round < 5) {
			$('.answer').not(userAnswer).animate({
				opacity: 1,
				left: "-=50"
			}, 1000, function(){});
		}
	}

	function guessedWrong(userAnswer) {
		userAnswer.css({'background-color': '#ff0b00', 'border': '#ff0b00'});
		correctAnswer.css({'background-color': '#00eb00', 'border': '#00eb00'});
		$('.answer').not(correctAnswer).animate({
			opacity: 0,
			left: "+=50"
		}, 1000, function(){
			if (round < 5)
				populate(round);
			$('.answer').css({'background-color': '', 'border': ''});
			$('.answer:hover').css({'background-color': '',
				'border': ''});
		});
		trophy.css('color', '#ff0b00');
		trophy = trophy.next();
		round++;
		if (round < 5) {
			$('.answer').not(correctAnswer).animate({
				opacity: 1,
				left: "-=50"
			}, 1000, function(){});
		}
	}

	function getCorrectAnswer(correcto) {
		for (var i = 0; i < answerElements.length; i++){
			if (answerElements.eq(i).text() == correcto){
				correctAnswerText = answerElements.eq(i).text();
				correctAnswer = answerElements.eq(i);
			}
			else
				continue;
		}
	}

	/* Populate the selectable list items with new answers for each round */
	function populate(round) {
		answer = $('.answer:first');
		rightAnswer = quiz[round].correct;
		photo.css('background-image', 'url(' + quiz[round].image + ')');
		for (var i = 0; i < quiz[round].answers.length; i++) {
			answer.text(quiz[round].answers[i]);
			answer = answer.next();
		}
		getCorrectAnswer(rightAnswer);
		return console.log(rightAnswer);
	}

});