const rows = 5;
const cols = 5;

var score = parseInt(document.getElementById("score-num").textContent); // score starts at 0
var level = parseInt(document.getElementById("level-num").textContent); // level starts at 1
var gameBoard = [];

initBoard();
console.log(gameBoard);
initTotals();

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
    split(tempBoard);
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

// Splits the temporary board into the new 2D array gameBoard, which will be used
// to simulate the game.
function split(tempBoard) {
    while (tempBoard.length) gameBoard.push(tempBoard.splice(0, 5));
}

// Sets the total points and number of Voltorbs for each row and column, and updates the HTML for them.
function initTotals() {
    initRowTotals();
}

//TODO: See if you can find a way to update the HTML that's cleaner than switch-case.
function initRowTotals() {
    for (var i = 0; i < gameBoard.length; i++) {
        var row = gameBoard[i];
        var pointTotal = 0;
        for (var j = 0; j < row.length; j++) {
            pointTotal += row[j];
        }
        switch(i) {
            case 0:
                document.getElementById("point-r1").innerHTML = pointTotal;
                break;
            case 1:
                document.getElementById("point-r2").innerHTML = pointTotal;
                break;
            case 2:
                document.getElementById("point-r3").innerHTML = pointTotal;
                break;
            case 3:
                document.getElementById("point-r4").innerHTML = pointTotal;
                break;
            case 4:
                document.getElementById("point-r5").innerHTML = pointTotal;
                break;
        }
    }
    
}