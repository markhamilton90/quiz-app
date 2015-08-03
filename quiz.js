$('document').ready(function(){

	/* User clicks answer, answers fade away and then appear again
	with new text content, populated by the array values in quiz.
	Plan on making this more modular */

	$('.answer').click(function(){
		if (this.id == 'correct'){
			console.log('You guessed the correct answer! ' + this.innerHTML);
			$('.answer').not(rightAnswer).fadeOut(1000);
			rightAnswer.css('background-color', 'rgb(0, 207, 0)');
			trophy.css('color', 'rgb(0, 255, 0)');
			trophy = trophy.next();
			isClicked = true;
		} else {
			$(this).css('background-color', 'red');
			rightAnswer.css('background-color', 'rgb(0, 207, 0)');
			trophy.css('color', 'red');
			trophy = trophy.next();
		}
		/* Having trouble here; instead of populating li elements immediately,
		I want to wait for the full delay and then populate them while hidden */
		$('.answer').delay(3000).hide(0);
		round++;
		populate(round);
		$('.answer').delay(1000).show(0);
	});

	var quiz = [{
		answers: ["Antonio Cassano", "Mesut Ozil", "Andrea Barzagli", "Gogo Pirlo"],
	}, {
		answers: ["Antonio Cassano", "Mesut Ozil", "HEY Barzagli", "Andrea Pirlo"],
	}, {
		answers: ["Antonio Cassano", "Ronaldo", "Andrea Barzagli", "Andrea Pirlo"],
	}, {
		answers: ["Antonio Cassano", "Mesut Ozil", "Joe Barzagli", "Andrea Pirlo"],
	}, {
		answers: ["Antonio Cassano", "Mesut Ozil", "Andrea Barzagli", "Andrea Pichu"],
	}];

	var answer = $('.answer:first');
	var rightAnswer = $('#correct');
	var correct = 0;
	var incorrect = 0;
	var round = 0;
	var trophy = $('.trophy:first');
	var isClicked = false;

	/* Populate the selectable list items with new answers for each round */
	function populate(round) {
		answer = $('.answer:first');
		for (var i = 0; i < quiz[round].answers.length; i++) {
			answer.text(quiz[round].answers[i]);
			answer = answer.next();
		}
	}

	/* Move to the next list of elements to be populated 
	   Might not end up using this though */
	function nextList(round) {
		populate(round);
	}

});