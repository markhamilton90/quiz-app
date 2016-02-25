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

Quiz.prototype.displayQuestion = function(answers, image) {
	image.css('backgroundImage', 'url(' + quiz.getQuestion().image + ')');
	for (var i = 0; i < this.getQuestion().choices.length; i++) {
		answers.text(this.getQuestion().choices[i]);
		answers = answers.next();
	}
}