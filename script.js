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

function startQuiz() {
    var $initialize = document.getElementById("home-page");

    $initialize.setAttribute("class", "hidden");
    $question.setAttribute("class", " ");
    $timeInterval = setInterval(function(){
    clockTick();
    }, 1000);
    $timer.textContent = $time;

    getQuestion();
}

function clockTick() {
    $time--;
    $timer.textContent = $time;

    if ($time <= 0){
    quizEnd();
    }
}

function getQuestion() {
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
    getQuestion();
    }
}

function quizEnd() {
    clearInterval($timeInterval);
    $timer.textContent = $time;

    var $finale = document.getElementById("finale");
    $finale.setAttribute("class", " ");

    var $scorePage = document.getElementById("score-page");
    $scorePage.textContent = $time;

    $question.setAttribute("class", "hidden");
}

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

$submit.addEventListener("click", saveHighscore);
$start.addEventListener("click", startQuiz);

// A function will go here the initializes the questions
// Questions will perhaps be objects?
// Function will allow user to click on different answers
// Function will deduct time if wrong answer is chosen

// Additional function will hide questions and reveal end section
// function will allow user to store initials and score in local data
// function will redirect user to highscores page

// A function will perhaps be called on to redirect user to start of quiz
// Function will also allow user to clear highscores as well