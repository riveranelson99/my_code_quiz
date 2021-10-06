// Establish variables globally to be called upon as needed
var $refresh = document.getElementById("clear");

// Establish function that removes the scores from local data
// The page is to be reloaded at this same instance to ensure the scores are cleared immediately
function refreshScores() {
    localStorage.removeItem("score-count");
    location.reload();
}

// Establish a function that is to be executed on page load
// Function is to check and see if there are any current scores saved in local data
// Should no scores exist, a message reflecting such will be put on screen
// If any scores do exist, they are to be populated on screen in a list structure
// Ensure that scores are listed from earliest to latest, top to bottom
function postScores() {
    var $scoreCount = JSON.parse(localStorage.getItem("score-count"));

    if ($scoreCount != null){
    $scoreCount.sort(function(a, b) {
        return parseInt(b.score) - parseInt(a.score);
    });
    for(var i = 0; i < $scoreCount.length; i++){
        var $scoreHistory = document.createElement("li");
        $scoreHistory.textContent = $scoreCount[i].initials + " - " + $scoreCount[i].score;
        document.getElementById("score-count").appendChild($scoreHistory);
    }    
    } else {
    var $null = document.getElementById("score-count");
    $null.textContent = "NO HIGH SCORES";
    }
}

// Establish click event listener to button that allows user to clear scores from local storage
$refresh.addEventListener("click", function(){
    refreshScores();
})
postScores();