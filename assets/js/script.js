/* references to divs */
var startButtonEl = document.getElementById("start");
var resetButtonEl = document.getElementById("reset");
var winsEl = document.getElementById("user-wins");
var lossesEl = document.getElementById("user-losses");
var timerEl = document.getElementById("timer");

/* array of words */
var wordList = [];
var wordIndex;

/* results */
var wins = 0;
var losses = 0;

/* start button listener */
startButtonEl.addEventListener("click", startGame);



/* reset button listener */
resetButtonEl.addEventListener("click", resetScores);

function startGame() {

    /* letters keydown listener */
    document.addEventListener("keydown", checkInputLetter);

    /* pick word */
    wordIndex = Math.floor(Math.random() * wordList.length);

    var gameTimer = 20;
    var timerId = setInterval( function() {
        gameTimer--;
        timerEl.textContent = gameTimer;

        if (gameTimer === 0) {
            clearInterval(timerId);
            losses++;
            lossesEl.textContent = losses;
        }
    }, 1000 );
}

function checkInputLetter() {
    /* check the letter */
    
}
/* local storage for w/l */

