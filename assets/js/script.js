/* references to divs */
var startButtonEl = document.getElementById("start");
var resetButtonEl = document.getElementById("reset");
var winsEl = document.getElementById("user-wins");
var lossesEl = document.getElementById("user-losses");
var timerEl = document.getElementById("timer");
var wordEl = document.getElementById("word")

/* array of words */
var wordList = ['look',
    'patrol',
    'slow',
    'opera',
    'difficult',
    'vehicle',
    'fade',
    'budget',
    'calendar',
    'mixture',
    'dozen',
    'thank',
    'beam',
    'message',
    'expand',
    'salad',
    'jury',
    'install',
    'cabin',
    'bark',
    'beer',
    'troop',
    'drawing',
    'poison',
    'productive',
    'disappear',
    'percent',
    'dignity',
    'option',
    'bench'];

var wordIndex;

/* results */
renderWinsAndLosses()
/* start button listener */
startButtonEl.addEventListener("click", startGame);

/* reset button listener */
resetButtonEl.addEventListener("click", resetScores);

function startGame(event) {
    // disable start button so it is not clickable during game
    startButtonEl.disabled = true;
    // pick word from list and generate html elements
    selectAndRenderWord();
    // get wins and losses form local storage
    var wins = JSON.parse(localStorage.getItem('wins'));
    var losses = JSON.parse(localStorage.getItem('losses'));
    // timer set to 10 seconds
    var gameTimer = 10;
    timerEl.textContent = gameTimer;
    var timerId = setInterval(function () {
        gameTimer--;
        timerEl.textContent = gameTimer;
        // loss condition
        if (gameTimer === 0) {
            // stop timer function
            clearInterval(timerId);
            // increment losses, store, update text
            losses++;
            localStorage.setItem('losses', losses);
            lossesEl.textContent = losses;
            endGame("YOU LOSE");
        }
    }, 1000);

    function checkInputLetter(event) {
        /* loop through children of word (letters, list items) */
        for (i = 0; i < wordEl.children.length; i++) {
            // if the key pressed is equal to the data letter in the list item
            if (event.key == wordEl.children[i].getAttribute('data-letter').toLowerCase()) {
                // set the content and a boolean
                wordEl.children[i].textContent = event.key;
                wordEl.children[i].setAttribute("data-included", true);
                // win condition
                // if all list items have been checked
                if (document.querySelectorAll('[data-included=true]').length == wordEl.children.length) {
                    // increment wins, store, update text
                    wins++;
                    localStorage.setItem('wins', wins);
                    winsEl.textContent = wins;
                    endGame("YOU WIN");
                }
            }
        }
    }

    function endGame(message) {
        clearInterval(timerId);
        // turn off key listener
        document.removeEventListener("keydown", checkInputLetter);
        // reenable start button
        startButtonEl.disabled = false;
        // replace word with YOU WIN
        wordEl.innerHTML = "";
        wordEl.innerText = message;
    }

    // turn on key listener
    document.addEventListener("keydown", checkInputLetter);
}



function selectAndRenderWord() {
    // remove inner HTML
    wordEl.innerHTML = '';
    // select random word
    var wordIndex = Math.floor(Math.random() * wordList.length);
    var word = wordList[wordIndex]
    // create a list item for each letter, with default textcontent of _
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
    localStorage.setItem("losses", "0");
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
