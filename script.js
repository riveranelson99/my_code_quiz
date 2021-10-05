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

var startBtn = document.getElementById("start");
var timerEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var submitBtn = document.getElementById("submit");
var currentQuestionIndex = 0;
var time = 60;
var timerId;

var questions = [ {

    title: "What tag is used to link a javascript file to your html?",
    choices: ["<div>", "<script>", "<a>", "<link>"],
    answer: "<script>"

    }, {

    title: "What is considered best casing practice for Javascript?",
    choices: ["Camel Case", "Pascal Case", "Snake Case", "Upper Case"],
    answer: "Camel Case"

    }, {

    title: "Which of the following is NOT a primitive data type?",
    choices: ["String", "Boolean", "Arrays", "Number"],
    answer: "Arrays"

    }, {

    title: "A local variable can be accessed globally.",
    choices: ["True", "False"],
    answer: "False"

    }, {

    title: "Defining a function is the same as invoking it.",
    choices: ["True", "False"],
    answer: "False"

    }, {

    title: "Functions that are owned by a certain type of element are known as what?",
    choices: ["Scope", "Conditional Statements", "Objects", "Methods"],
    answer: "Methods"

    }
];

function startQuiz() {
    var startScreen = document.getElementById("start-screen");

    startScreen.setAttribute("class", "hide");
    questionsEl.setAttribute("class", " ");
    timerId = setInterval(function(){
    clockTick();
    }, 1000);
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    questionsEl.children[0].textContent = currentQuestion.title;
    while (choicesEl.hasChildNodes()){
    choicesEl.removeChild(choicesEl.lastChild);
    }
    for (var i = 0; i < currentQuestion.choices.length; i++){
    var choiceButton = document.createElement("button");

    choiceButton.textContent = currentQuestion.choices[i];    
    choicesEl.appendChild(choiceButton);
    }    
    choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
    });
    choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
    });
    choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
    });
    choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
    });
}

function questionClick(answerChoice) {
    if (answerChoice.textContent != questions[currentQuestionIndex].answer){
    time -= 10;
    feedbackEl.textContent = "Incorrect";
    } else {
    feedbackEl.textContent = "Correct";
    }
    feedbackEl.setAttribute("class", "feedback");
    setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
    }, 500);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
    quizEnd();
    } else {
    getQuestion();
    }
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0){
    quizEnd();
    }
}

function quizEnd() {
    clearInterval(timerId);
    timerEl.textContent = time;

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.setAttribute("class", " ");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
    var initials = initialsEl.value.toUpperCase();
    if (initials === ""){ 
    alert("Input mustn't be blank'");
    return;
    } else {
    var highscores;
    if (JSON.parse(localStorage.getItem("highscores")) != null)
        highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
        highscores = [];
    var newScore = {
        initials: initials,
        score: time
    };
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    location.href = "assets/highscores/highscores.html";
    }
}

function checkForEnter(event) {
    if (event.keyCode === 13){
        saveHighscore();
    }
}


submitBtn.addEventListener("click", saveHighscore);
startBtn.addEventListener("click", startQuiz);
initialsEl.addEventListener("keyup", checkForEnter);
// A function will go here the initializes the questions
// Questions will perhaps be objects?
// Function will allow user to click on different answers
// Function will deduct time if wrong answer is chosen

// Additional function will hide questions and reveal end section
// function will allow user to store initials and score in local data
// function will redirect user to highscores page

// A function will perhaps be called on to redirect user to start of quiz
// Function will also allow user to clear highscores as well

// startBtn.addEventListener("click", initializeQuiz)
