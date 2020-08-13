const rows = 5;
const cols = 5;

var level = parseInt(document.getElementById("level-num").textContent);
var levelScore; // The max score you can achieve on a given level. This is updated every time initBoard() runs.
var currentScore = parseInt(document.getElementById("current-score-num").textContent) // The current score on a given level.
var totalScore = parseInt(document.getElementById("total-score-num").textContent); // The total score throughout all levels so far.
var gameBoard = [];
var tiles = split(Array.from(document.getElementsByClassName("tile")));

initBoard(level); // level starts at 1

// Add an event listener to each button.
tiles.forEach(element => {
    var x = tiles.indexOf(element);
    element.forEach(tile => {
        var y = element.indexOf(tile);
        tile.addEventListener("click", function() {
            tileClicked(x, y);
        });
    });
});

// Event listener for Reset button to reset the game board.
document.getElementById("reset-button").addEventListener("click", resetBoard);

// Event listener for the Next Level button to advance the game board.
document.getElementById("level-up-button").addEventListener("click", advanceLevel);

/**
 * When a tile is clicked, two things need to happen:
 * 1. The number underneath the tile is revealed.
 * 2. The score either increases if the number was not a Voltorb (represented by a 0), or a Game Over occurs
 *    if the number was a Voltorb.
 */
function tileClicked(x, y) {
    var value = gameBoard[x][y];
    if (tiles[x][y].innerHTML == value) { // If the user clicks a tile that's already uncovered, do nothing.
        return;
    }

    tiles[x][y].innerHTML = value;
    if (value == 0) {
        tiles[x][y].style.backgroundColor = "#eb3434";
        handleGameOver();
    } else {
        currentScore != 0 ? currentScore *= value : currentScore += value;
        document.getElementById("current-score-num").innerHTML = currentScore;
    } 

    if (currentScore == levelScore) {
        handleLevelUp();
    }
}

// Creates a game board based on the game's current level.
function initBoard(level) {
    var tempBoard = []; // Temporary array to insert all the necessary values.

    const numVoltorbs = randomBetween(level + 3, level + 5); // Number of Voltorbs to include in the board.
    var numTwos = 0; // Number of twos and threes to include on the board.
    var numThrees = 0; 

    const minScore = 12 * Math.pow(2, level); // The minimum possible score you can get on a level.
    levelScore = 1; // The actual score you can get on the current level.

    while (levelScore < minScore) {
        var numToInclude = randomBetween(2, 3);
        levelScore *= numToInclude;
        numToInclude == 2 ? numTwos += 1 : numThrees += 1;
    }

    var numOnes = (rows * cols) - numVoltorbs - numTwos - numThrees; // Number of ones to include is equal to the remaining space on the board.
    for (var i = 0; i < numOnes; i++) {
        tempBoard.push(1);
    }

    for (var i = 0; i < numVoltorbs; i++) {
        tempBoard.push(0);
    }

    for (var i = 0; i < numTwos; i++) {
        tempBoard.push(2);
    }

    for (var i = 0; i < numThrees; i++) {
        tempBoard.push(3);
    }

    shuffle(tempBoard);
    gameBoard = split(tempBoard);
    initTotals();
}

// Returns a random number between the specified minimum and maximum, inclusive.
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Randomly shuffles an array using the modern Fisher-Yates algoritm.
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = randomBetween(0, i);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Splits a given array into a new 2D array with inner arrays having a length of 5.
function split(array) {
    var newArray = [];
    while (array.length) newArray.push(array.splice(0, 5));
    return newArray;
}

// Sets the total points and number of Voltorbs for each row and column, and updates the HTML for them.
function initTotals() {
    initRowTotals();
    initColumnTotals();
}

function initRowTotals() {
    var pointTotalRows = document.getElementsByClassName("point-total-row");
    var voltorbTotalRows = document.getElementsByClassName("voltorb-total-row");
    for (var i = 0; i < gameBoard.length; i++) {
        var row = gameBoard[i];
        var pointTotal = 0;
        var voltorbTotal = 0;
        for (var j = 0; j < row.length; j++) {
            pointTotal += row[j];
            if (row[j] == 0) voltorbTotal++;
        }
        pointTotalRows[i].innerHTML = pointTotal;
        voltorbTotalRows[i].innerHTML = voltorbTotal;
    }
}

function initColumnTotals() {
    var pointTotalCols = document.getElementsByClassName("point-total-col");
    var voltorbTotalCols = document.getElementsByClassName("voltorb-total-col");
    for (var i = 0; i < gameBoard[0].length; i++) {
        var pointTotal = 0;
        var voltorbTotal = 0;
        for (var j = 0; j < gameBoard.length; j++) {
            pointTotal += gameBoard[j][i];
            if (gameBoard[j][i] == 0) voltorbTotal++;
        }
        pointTotalCols[i].innerHTML = pointTotal;
        voltorbTotalCols[i].innerHTML = voltorbTotal;
    }
}

// Resets all tiles to display question marks instead of numbers, and updates dialogue text. A new board at Level 1 is then initialized.
function resetBoard() {
    refreshTiles();
    level = 1;
    document.getElementById("level-num").innerHTML = level;
    currentScore = 0;
    document.getElementById("current-score-num").innerHTML = currentScore;
    totalScore = 0;
    document.getElementById("total-score-num").innerHTML = totalScore;

    document.getElementById("dialogue-text").innerHTML = "Let's play Voltorb Flip! Please click a square to get started.";
    document.getElementById("reset-button").style.display = "none";
    initBoard(level);
}

// Increases the level by 1 (up to a max of 8), updates the total score throughout the game, then initializes a new board at the new level.
function advanceLevel() {
    refreshTiles();
    if (level <= 7) level++;
    document.getElementById("level-num").innerHTML = level;
    totalScore += currentScore;
    document.getElementById("total-score-num").innerHTML = totalScore;
    currentScore = 0;
    document.getElementById("current-score-num").innerHTML = currentScore;

    document.getElementById("dialogue-text").innerHTML = "Let's play Voltorb Flip! Please click a square to get started.";
    document.getElementById("level-up-button").style.display = "none";
    initBoard(level);
}

// Resets all tiles to display question marks.
function refreshTiles() {
    for (var i = 0; i < tiles.length; i++) {
        var row = tiles[i];
        for (var j = 0; j < row.length; j++) {
            tiles[i][j].innerHTML = "?";
            tiles[i][j].style.backgroundColor = "#66e344";
        }
    }
}

// Reveals all the board tiles and displays the option to advance.
function handleLevelUp() {
    document.getElementById("dialogue-text").innerHTML = "Level " + level + " cleared! Click here to advance: ";
    document.getElementById("level-up-button").style.display = "inline-block";
    revealBoard();
}

// Reveals all board tiles and displays the option to restart.
function handleGameOver() {
    document.getElementById("dialogue-text").innerHTML = "Too bad! Click here to restart: ";
    document.getElementById("reset-button").style.display = "inline-block";
    revealBoard();
}

// Reveals the number under all tiles on the game board.
function revealBoard() {
    for (var i = 0; i < tiles.length; i++) {
        var row = tiles[i];
        for (var j = 0; j < row.length; j++) {
            tiles[i][j].innerHTML = gameBoard[i][j];
            if (gameBoard[i][j] == 0) tiles[i][j].style.backgroundColor = "#eb3434";
        }
    }
}