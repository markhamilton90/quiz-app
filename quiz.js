$('document').ready(function(){

	// declare global variables

	var answers = $('.answer');
	var rightAnswer = "Andrea Barzagli";
	var correctAnswer;
	var correctAnswerText;
	var round = 0;
	var correct = 0;
	var trophy = $('.trophy:first');
	var isClickable = true;
	var scoresheet = false;

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
	
	
	// main game

	getCorrectAnswer(rightAnswer);
	answers.on("click", guessAnswer);
	$('#newgame').on('click', newGame);
	

	// determine how to animate li elements after user clicks on one
	
	function guessAnswer() {
		if (this.innerHTML == correctAnswerText){
			guessedRight($(this));
		} else {
			guessedWrong($(this));
		}
	} 

	function guessedRight(userAnswer) {
		answers.off();
		isClickable = false;
		userAnswer.css({'background-color': '#00eb00', 'border': '#00eb00'});
		answers.not(userAnswer).animate({
			opacity: 0,
			left: "+=50"
		}, 1000, function(){
			console.log(round);
			if (round < 5)
				populate(round);
			answers.css({'background-color': '', 'border': ''});
			$('.answer:hover').css({'background-color': '',
				'border': ''});
		});
		round++;
		correct++;
		trophy.css('color', '#00eb00');
		trophy = trophy.next();
		if (round < 5) {
			answers.not(userAnswer).animate({
				opacity: 1,
				left: "-=50"
			}, 1000, function(){
				if (isClickable == false){
					answers.on("click", guessAnswer);
					isClickable = true;
					console.log("Now clickable?");
				}
			});
		}
		else {
			winningMsg();
		}
	}

	function guessedWrong(userAnswer) {
		answers.off();
		isClickable = false;
		userAnswer.css({'background-color': '#ff3000', 'border': '#ff3000'});
		correctAnswer.css({'background-color': '#00eb00', 'border': '#00eb00'});
		answers.not(correctAnswer).animate({
			opacity: 0,
			left: "+=50"
		}, 1000, function(){
			if (round < 5)
				populate(round);
			answers.css({'background-color': '', 'border': ''});
			$('.answer:hover').css({'background-color': '',
				'border': ''});
		});
		trophy.css('color', '#ff3000');
		trophy = trophy.next();
		round++;
		if (round < 5) {
			answers.not(correctAnswer).animate({
				opacity: 1,
				left: "-=50"
			}, 1000, function(){
				if (isClickable == false){
					answers.on("click", guessAnswer);
					isClickable = true;
					console.log("Now clickable?");
				}
			});
		}
		else
			winningMsg();
	}

	// message to be printed at end of game, depending on score
	
	function winningMsg() {
		var msg = "";
		if (correct <= 2) {
			msg = "<h1>You only answered " + correct + " questions correctly. Too bad...</h1>";
			$('#scoresheet p').css('color', '#ff0b00');
		} 
		else if (correct <= 4)
			msg = "<h1>You answered " + correct + " questions correctly! Good job!</h1>";
		else if (correct = 5)
			msg = "<h1>Golaso! You answered all 5 questions correctly!</h1>";
		document.getElementById('scoresheet').innerHTML += msg;
		$('#scoresheet').show();
		scoresheet = true;
	}

	function newGame() {
		rightAnswer = "Andrea Barzagli";
		round = 0;
		correct = 0;
		trophy = $('.trophy:first');
		isClickable = true;
		$('#scoresheet').hide();
		answers.off();
		$('.trophy').css('color', '');
		document.getElementById('scoresheet').innerHTML = '<p class="fa fa-trophy fa-5x"></p>';

		getCorrectAnswer(rightAnswer);
		populate(round);
		answers.on("click", guessAnswer);

		if (scoresheet == true) {
			answers.not(correctAnswer).animate({
				'left': '-=50', 'opacity': '1'
			}, 1000);
			scoresheet = false;
		}
	}
	
	// loop through li elements until arg matches correct answer

	function getCorrectAnswer(correcto) {
		for (var i = 0; i < answers.length; i++){
			if (answers.eq(i).text() == correcto){
				correctAnswerText = answers.eq(i).text();
				correctAnswer = answers.eq(i);
			}
			else
				continue;
		}
	}

	// Populate the selectable list items with new answers for each round,
	// get correct player photo and text for the right answer
	
	function populate(round) {
		var answer = $('.answer:first');
		var photo = $('#photo');
		rightAnswer = quiz[round].correct;
		photo.css('background-image', 'url(' + quiz[round].image + ')');
		for (var i = 0; i < quiz[round].answers.length; i++) {
			answer.text(quiz[round].answers[i]);
			answer = answer.next();
		}
		getCorrectAnswer(rightAnswer);
	}

});