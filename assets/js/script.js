/* references to divs */
var startButtonEl = document.getElementById("start");
var resetButtonEl = document.getElementById("reset");
var winsEl = document.getElementById("user-wins");
var lossesEl = document.getElementById("user-losses");
var timerEl = document.getElementById("timer");
var wordEl = document.getElementById("word")

/* array of words */
var wordList = ['hangman', "guess again"];
var wordIndex;
var word; /* the word the game selected */
var partialWord = [];
var wordFound = false;

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

    var gameTimer = 60;
    var timerId = setInterval( function() {
        gameTimer--;
        timerEl.textContent = gameTimer;

        if (gameTimer === 0){
            clearInterval(timerId);
            losses++;
            localStorage.setItem('losses', losses);
            lossesEl.textContent = losses;
        } else if (wordFound === true){
            clearInterval(timerId);
            /*
            wins++;
            localStorage.setItem('losses', losses);
            lossesEl.textContent = losses;
            */
        }
    }, 1000);

    document.addEventListener("keydown", function(event) {
           /* check the letter */
        var wins = JSON.parse(localStorage.getItem('wins'));
        var losses = JSON.parse(localStorage.getItem('losses'));

        console.log("key down: " + event.key);

        var key = event.key.toLowerCase();
        var wordArray =  word.split("");
        console.log("wordArray: " + wordArray);

        if (wordArray.includes(key)) {
            console.log(key + "is in " + word);
            for (var i = 0; i < wordArray.length; i++) {
                /* fill the partial word */
                if(wordArray[i] === key) {
                    partialWord[i] = key;
                } 
                console.log("partialWord: " + partialWord);
                var partialWordStr = partialWord.join("");
                wordEl.textContent = partialWordStr;
            }
            /* now check if the partialWord is complete */
            if(word === partialWordStr)  {
                console.log("word is filled");
                /* the word is complete */
                wordFound = true;
                wins++;
                localStorage.setItem('wins', wins);
                winsEl.textContent = wins;
                wordFound = true;
            } else {
                console.log("partialWord is not filled yet");
            }
        } else {
            console.log(key + "is not in " + word);
        }

    });
}


function  selectAndRenderWord(){
    wordIndex = Math.floor(Math.random() * wordList.length);
    word = wordList[wordIndex]
    // fill partialWord with ----
    for (var i = 0; i < word.length; i++) {
        partialWord[i] = '-';
    }
    wordEl.textContent = partialWord;

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
