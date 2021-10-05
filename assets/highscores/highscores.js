var $refresh = document.getElementById("clear");

function refreshScores() {
    localStorage.removeItem("score-count");
    location.reload();
}

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

$refresh.addEventListener("click", function(){
    refreshScores();
})
postScores();