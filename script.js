/*
The javascript will run a majority of the work behind the quiz
By pressing the start button, the focus point will hide and begin the questions
The start button will also initialize a timer that begins counting down
Questions will take place of the focus point
Questions will be accompanied by 4 answers
Questions are to be click interactions
For every wrong answer, we are going to deduct some time from the remainder
After completing the quiz, user will submit their initials to be stored in local data ALONG with score total
Score is to be determined on either time remaining or number of right answers
User will submit and be taken to a highscore page
User can see scores or clear them
User can choose to return to quiz start to take again
*/

// Remember that functions can live within functions

// Establish all variables globally to be called upon as needed
// Follow newly learned naming convention for ease of viewing
var $start = document.getElementById("start");
var $timer = document.getElementById("countdown");
var $question = document.getElementById("question");
var $answers = document.getElementById("answers");
var $save = document.getElementById("name");
var $answerIndicator = document.getElementById("indicator");
var $submit = document.getElementById("submit");
var $questionIndex = 0;
var $time = 75;
var $timeInterval;

// Establish questions as an object/array to be pulled from when the questions are to be populated
// Ensure the question object/array are approximately 5+ questions
var $questionArray = [ {

    quesiton: "What tag is used to link a javascript file to your html?",
    options: ["<div>", "<script>", "<a>", "<link>"],
    answer: "<script>"

    }, {

    quesiton: "What is considered best casing practice for Javascript?",
    options: ["Camel Case", "Pascal Case", "Snake Case", "Upper Case"],
    answer: "Camel Case"

    }, {

    quesiton: "Which of the following is NOT a primitive data type?",
    options: ["String", "Boolean", "Arrays", "Number"],
    answer: "Arrays"

    }, {

    quesiton: "A local variable can be accessed globally.",
    options: ["True", "False"],
    answer: "False"

    }, {

    quesiton: "Defining a function is the same as invoking it.",
    options: ["True", "False"],
    answer: "False"

    }, {

    quesiton: "Functions that are owned by a certain type of element are known as what?",
    options: ["Scope", "Conditional Statements", "Objects", "Methods"],
    answer: "Methods"

    }
];

// Establish function that initiates the quiz upon clicking on the start button
// In addition to initiating the quiz, the start button will also begin the countdown timer
// Ensure that questions are populated via seperate function
function initializeQuiz() {
    var $initialize = document.getElementById("home-page");

    $initialize.setAttribute("class", "hidden");
    $question.setAttribute("class", " ");
    $timeInterval = setInterval(function(){
    countDown();
    }, 1000);
    $timer.textContent = $time;

    populateQuestion();
}

// Establish the countdown timer as a function to be intialized upon the start of the quiz
// Ensure the quiz is ended when the timer runs out
function countDown() {
    $time--;
    $timer.textContent = $time;

    if ($time <= 0){
        quizEnd();
    }
}

// Establish function that populates question based on question object/array
// The questions are to populate in sequential order of how I list them
// When a question is populated, buttons are created that contain all of the available options for that specific question
// Ensure that questions are removed and a new one is populated upon answer given (cycling through the questions without having them jumble up on one another)
function populateQuestion() {
    var $activeQuestion = $questionArray[$questionIndex];

    $question.children[0].textContent = $activeQuestion.quesiton;
    while ($answers.hasChildNodes()){
        $answers.removeChild($answers.lastChild);
    }
    for (var i = 0; i < $activeQuestion.options.length; i++){
        var $optionButton = document.createElement("button");

        $optionButton.textContent = $activeQuestion.options[i];    
        $answers.appendChild($optionButton);
    }    
    $answers.children[0].addEventListener("click", function(event){
    questionClick($answers.children[0]);
    });
    $answers.children[1].addEventListener("click", function(event){
    questionClick($answers.children[1]);
    });
    $answers.children[2].addEventListener("click", function(event){
    questionClick($answers.children[2]);
    });
    $answers.children[3].addEventListener("click", function(event){
    questionClick($answers.children[3]);
    });
}

// Establish function that checks on the answers the user clicks
// For every wrong answer, notify the user that they are incorrect and deduct time from countdown
// For every correct answer, notify the user that they are correct and populate the next question
// Have countdown timer checked against the questions to ensure there is available time, if not, end the quiz
function questionClick(answerChoice) {
    if (answerChoice.textContent != $questionArray[$questionIndex].answer){
        $time -= 10;
        $answerIndicator.textContent = "Incorrect";
    } else {
        $answerIndicator.textContent = "Correct";
    }
        $answerIndicator.setAttribute("class", "indicator");
        setInterval(function(){
        $answerIndicator.setAttribute("class", "hidden");
    }, 750);

    $questionIndex++;
    if ($questionIndex === $questionArray.length) {
        quizEnd();
    } else {
        populateQuestion();
    }
}

// Establish function that ends the quiz when all questions have been exhausted or countdown runs out of time
// Ensure that no question remains visible and in turn, reveal the final point
// The final point will display any time remaining as the users score
function quizEnd() {
    clearInterval($timeInterval);
    $timer.textContent = $time;

    var $finale = document.getElementById("finale");
    $finale.setAttribute("class", " ");

    var $scorePage = document.getElementById("score-page");
    $scorePage.textContent = $time;

    $question.setAttribute("class", "hidden");
}

// Establish function that allows user to save their scores upon completion of quiz
// The user will be presented with the option to enter their name
// Try to prompt user to not leave name blank
// The users score is set to local data to be referenced again later if they so choose
// Said score is to be added onto any exisiting scores in local data (should any exist)
function saveHighscore() {
    var $name = $save.value.toUpperCase();
    if ($name === ""){ 
        alert("Input mustn't be blank'");
    
    return;
    } else {
        var $scoreTotals;
    if (JSON.parse(localStorage.getItem("score-count")) != null)
        $scoreTotals = JSON.parse(window.localStorage.getItem("score-count"));
    else
        $scoreTotals = [];
        
        var $scoreSave = {
        initials: $name,
        score: $time
    };
    $scoreTotals.push($scoreSave);
    localStorage.setItem("score-count", JSON.stringify($scoreTotals));
    location.href = "assets/highscores/highscores.html";
    }
}

// Establish click event listeners to the start and submit button that fire off the series of functions that run the quiz
$submit.addEventListener("click", saveHighscore);
$start.addEventListener("click", initializeQuiz);