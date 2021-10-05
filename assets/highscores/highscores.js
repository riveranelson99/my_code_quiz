var clearButton = document.getElementById("clear");

function printHighscores() {
    var highScores = JSON.parse(localStorage.getItem("highscores"));

    if (highScores != null){
    highScores.sort(function(a, b) {
        return parseInt(b.score) - parseInt(a.score);
    });

    for(var i = 0; i < highScores.length; i++){
        var scoreLi = document.createElement("li");
        scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
        document.getElementById("highscores").appendChild(scoreLi);
    }
    
    } else {
    var temp = document.getElementById("highscores");
    temp.textContent = "NO HIGH SCORES";     
    }
}

function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
}

printHighscores();
clearButton.addEventListener("click", function(){
    clearHighscores();
})