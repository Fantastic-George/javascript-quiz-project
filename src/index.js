document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer;


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results


  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();



    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    questionContainer.innerText = question.text

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    //calculate percentage based on total questions array and current question position

    let percentage; 
    if (quiz.questions.length > 0) {
      percentage = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    } else {
      percentage = 0;
    };

    //console.log(percentage);

    progressBar.style.width = percentage + `%`; // This value is hardcoded as a placeholder



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `${quiz.currentQuestionIndex} of ${quiz.questions.length}`; 


    const parentElm = document.getElementById("choices"); // here are the choices

    if (parentElm) {
      const choicesDiv = document.createElement("div");

      // question's options
      const choicesQuiz = question.choices; // Get choices for the first question

      // form with choices
      let choicesHTML = "";
      choicesQuiz.forEach((choice, index) => {
        choicesHTML += `
      <div>
        <input type="radio" name="choice" value="${choice}" id="choice-${index}">
        <label for="choice-${index}">${choice}</label>
      </div>
    `;
      });

      // Build the full form
      choicesDiv.innerHTML = `
    <form id="quiz-form">
      ${choicesHTML}
     
    </form>
  `;

      // Append the form to the parent element
      parentElm.appendChild(choicesDiv);
    }
  }


  //---> BUTTON ANSWER <-----


    function nextButtonHandler() {
      const ele = document.getElementsByName('choice');
      let selectedAnswer; // A variable to store the selected answer value

    for ( let i = 0; i < ele.length; i++) {

      // checked is a property for the form radio
        if (ele[i].checked){ 
          selectedAnswer = ele[i].value;
          // selectedAnswer from the form
        }
        
    }
      
      quiz.checkAnswer(selectedAnswer); // here the quiz will evaluate the result
      quiz.moveToNextQuestion();
      showQuestion();
      

    }




    function showResults() {

      // YOUR CODE HERE:
      if (quiz.currentQuestionIndex === quiz.questions.length) {

        // 1. Hide the quiz view (div#quizView)
        quizView.style.display = "none";

        // 2. Show the end view (div#endView)
        endView.style.display = "flex";

        // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
        resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
      }
    }

    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", resetQuiz);

      function resetQuiz() {

        // Hide end view and show quiz view
        endView.style.display = "none";
        quizView.style.display = "flex";

        // Reset quiz state
        quiz.currentQuestionIndex = 0;
        quiz.correctAnswers = 0;

        // Shuffle questions using Quiz class method
        quiz.shuffleQuestions();

        // Show first question
        showQuestion();
      }

  
  });

