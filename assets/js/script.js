/* references to divs */
var startButtonEl = document.getElementById("start");
var resetButtonEl = document.getElementById("reset");
var winsEl = document.getElementById("user-wins");
var lossesEl = document.getElementById("user-losses");
var timerEl = document.getElementById("timer");
var wordEl = document.getElementById("word")

/* array of words */
var wordList = ['HANGMAN', "GUESS AGAIN"];
var wordIndex;

/* results */
renderWinsAndLosses()
/* start button listener */
startButtonEl.addEventListener("click", startGame);

/* reset button listener */
resetButtonEl.addEventListener("click", resetScores);

function startGame() {
    selectAndRenderWord()
    var wins = JSON.parse(localStorage.getItem('wins'));
    var losses = JSON.parse(localStorage.getItem('losses'));
    /* letters keydown listener */

    /* pick word */


    var gameTimer = 3;
    var timerId = setInterval( function() {
        gameTimer--;
        timerEl.textContent = gameTimer;

        if (gameTimer === 0) {
            clearInterval(timerId);
            losses++;
            localStorage.setItem('losses', losses);
            lossesEl.textContent = losses;
        }
    }, 1000);

    document.addEventListener("keydown", checkInputLetter);
}

function checkInputLetter(event) {
    /* check the letter */
    var wins = JSON.parse(localStorage.getItem('wins'));
    var losses = JSON.parse(localStorage.getItem('losses'));
    wins++;
    localStorage.setItem('wins', wins);
    winsEl.textContent = wins;
}

function  selectAndRenderWord(){
    var wordIndex = Math.floor(Math.random() * wordList.length);
    var word = wordList[wordIndex]
    wordEl.textContent = word;
}

function resetScores() {
    wins = 0;
    losses = 0;
    localStorage.setItem("wins", "0");
    localStorage.setItem("losses","0");
    renderWinsAndLosses()
}
/* local storage for w/l */
function renderWinsAndLosses() {
    var wins = JSON.parse(localStorage.getItem('wins'));
    var losses = JSON.parse(localStorage.getItem('losses'));
    if (!wins) {
        wins = 0;
    }
    if (!losses) {
        losses = 0;
    }
    lossesEl.textContent = losses;
    winsEl.textContent = wins;
}
