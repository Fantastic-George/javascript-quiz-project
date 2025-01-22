class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
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
        this.currentQuestionIndex += 1;
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
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers += 1;
        }
    } // question for Daniel!!??

    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return this.currentQuestionIndex === this.questions.length;
        } if (this.currentQuestionIndex <= this.questions.length) {
            return false
        }
    }
    
  

    filterQuestionsByDifficulty(difficulty) { // still not getting all green from Jasmine but can't work out what's missing

        if (typeof difficulty === "number" && difficulty > 0 && difficulty < 3) {
            //return;
        } this.questions = this.questions.filter((element, index, array) => {
            if (element.difficulty === difficulty) {
                return true;
            } else {
                return false;
            }

        })
    }

    averageDifficulty() {

        if (this.questions.length === 0){
            return;
        }
       const totalQuestionDifficulty = this.questions.reduce( (accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue.difficulty;
       }, 0); 
       return totalQuestionDifficulty / this.questions.length;

    }

}

 



/*

const menu = [
  { name: 'Greek Salad', calories: 200, isVeggie: true },
  { name: 'Mushroom Risotto', calories: 350, isVeggie: true },
  { name: 'Falafel', calories: 333, isVeggie: true },
  { name: 'Turkey Sandwich', calories: 320, isVeggie: false },
  { name: 'Pasta Primavera', calories: 320, isVeggie: true },
  { name: 'Grilled Salmon', calories: 400, isVeggie: false },
];

//
// Iteration 1: Calculate the average number of calories.
//

const totalCalories = menu.reduce(function (acc, currentValue) {
  return acc + currentValue.calories;
}, 0);

console.log(`Average calories: ${totalCalories / menu.length}`);

//
// Bonus: Calculate the average number of calories of the veggie options.
//

let numberOfVeggieOptions = 0;

const totalCaloriesVeggieOptions = menu.reduce(function (acc, currentValue) {
  if (currentValue.isVeggie) {
    numberOfVeggieOptions++;
    return acc + currentValue.calories;
  } else {
    return acc;
  }
}, 0);

console.log(
  `Average calories of the Veggie options: ${
    totalCaloriesVeggieOptions / numberOfVeggieOptions
  }`
);
*/