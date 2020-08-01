const rows = 5;
const cols = 5;

var score = parseInt(document.getElementById("score-num").textContent); // score starts at 0
var level = parseInt(document.getElementById("level-num").textContent); // level starts at 1
var gameBoard = [];

initBoard();

function initBoard() {
    var tempBoard = []; // Temporary array to insert all the necessary values.

    const numVoltorbs = randomBetween(level + 3, level + 5); // Number of Voltorbs to include in the board.
    var numTwos = 0; // Number of twos and threes to include on the board.
    var numThrees = 0; 

    const minScore = 12 * Math.pow(2, level); // The minimum possible score you can get on a level.
    var levelScore = 1; // The actual score you can get on the current level.

    while (levelScore < minScore) {
        var numToInclude = randomBetween(2, 3);
        levelScore *= numToInclude;
        numToInclude == 2 ? numTwos += 1 : numThrees += 1;
    }

}

// Returns a random number between the specified minimum and maximum, inclusive.
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}