const rows = 5;
const cols = 5;

var level = parseInt(document.getElementById("level-num").textContent);
var score = parseInt(document.getElementById("score-num").textContent); // score starts at 0
var gameBoard = [];
var tiles = split(Array.from(document.getElementsByClassName("tile")));

initBoard(level); // level starts at 1
console.log(gameBoard);
console.log(tiles);
initTotals();

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

function tileClicked(x, y) {
    tiles[x][y].innerHTML = gameBoard[x][y];
}

function initBoard(level) {
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
    resetTiles();
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

// Resets all tiles to display question marks instead of numbers.
function resetTiles() {
    for (var i = 0; i < tiles.length; i++) {
        var row = tiles[i];
        for (var j = 0; j < row.length; j++) {
            tiles[i][j].innerHTML = "?";
        }
    }
}