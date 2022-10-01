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

function startGame(event) {
    startButtonEl.disabled=true;
    event.stopImmediatePropagation();
    selectAndRenderWord();
    var wins = JSON.parse(localStorage.getItem('wins'));
    var losses = JSON.parse(localStorage.getItem('losses'));
    /* letters keydown listener */

    /* pick word */


    var gameTimer = 10;
    timerEl.textContent = gameTimer;
    var timerId = setInterval( function() {
        gameTimer--;
        timerEl.textContent = gameTimer;

        if (gameTimer === 0) {
            clearInterval(timerId);
            losses++;
            localStorage.setItem('losses', losses);
            lossesEl.textContent = losses;
            document.removeEventListener("keydown", checkInputLetter);
            startButtonEl.disabled=false;
            wordEl.innerHTML="";
            wordEl.innerText = "YOU LOSE";
        }
    }, 1000);

    function checkInputLetter(event) {
        /* check the letter */
        var letters = wordEl.children;
        for (i=0; i < wordEl.children.length; i++) {
            if (event.key == wordEl.children[i].getAttribute('data-letter').toLowerCase()) {
                wordEl.children[i].textContent = event.key;
                wordEl.children[i].setAttribute("data-included", true);
            }
        }
        if (document.querySelectorAll('[data-included=true]').length == wordEl.children.length) {
            wins += 1;
            localStorage.setItem('wins', wins);
            winsEl.textContent = wins;
            clearInterval(timerId);
            document.removeEventListener("keydown", checkInputLetter);
            startButtonEl.disabled=false;
            wordEl.innerHTML="";
            wordEl.innerText = "YOU WIN";
        }
    }

    document.addEventListener("keydown", checkInputLetter);
}



function  selectAndRenderWord(){
    wordEl.innerHTML ='';
    var wordIndex = Math.floor(Math.random() * wordList.length);
    var word = wordList[wordIndex]
    console.log(word);
    for (let i = 0; i < word.length; i++) {
        var letter = document.createElement("li");
        letter.setAttribute("data-letter", word[i]);
        letter.setAttribute("data-included", false);
        letter.textContent = "_";
        wordEl.appendChild(letter);
      }
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
