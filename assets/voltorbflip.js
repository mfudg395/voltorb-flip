var score = parseInt(document.getElementById("score-num").textContent); // score starts at 0
var level = parseInt(document.getElementById("level-num").textContent); // level starts at 1
var gameBoard = [];

initGame();

function initBoard() {

}

// Returns a random number between the specified minimum and maximum, inclusive.
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}