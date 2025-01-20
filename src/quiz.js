class Quiz {
  constructor(questions, timeLimit, timeRemaining){
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion() {
        this.currentQuestionIndex+= 1;
    }

    shuffleQuestions() {
        let currentIndex = this.questions.length; 
        while (currentIndex !== 0) {


            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;


            [this.questions[currentIndex], this.questions[randomIndex]] = [
                this.questions[randomIndex], this.questions[currentIndex]];
        }
    }


    checkAnswer(answer) {
        if (answer === this.correctAnswer) {
            this.correctAnswers+=1;
        }
    } // question for Daniel!!??

    hasEnded(){
        if (this.currentQuestionIndex === this.questions.length) {
        return this.currentQuestionIndex === this.questions.length;
        } if (this.currentQuestionIndex <= this.questions.length) {
        return false
        }
    }
}

/*class Quiz

should receive questions (array) as its 1st argument and assign it to questions property. The array is meant to contain Question objects
should receive timeLimit (number) as its 2nd argument and assign it to timeLimit property.
should receive timeRemaining (number) as its 3rd argument and assign it to timeRemaining property.
should have a correctAnswers property initially set to 0.
should have a currentQuestionIndex property initially set to 0.*/