# voltorb-flip
A re-creation of Voltorb Flip, a Minesweeper-Picross style puzzle minigame.

## Origin
Voltorb Flip is a minigame available in certain releases of Pokemon HeartGold and Pokemon SoulSilver on the Nintendo DS. In the game,
players can earn coins by progressing through higher levels that can then be spend on rewards.

The game has been described as a mix of Minesweeper and Picross, and it requires a combination of thinking skill and luck in order to
win.

## Rules
The objective of Voltorb Flip is to uncover every point-earning tile on the board without uncovering a single Voltorb - the equivalent
of bombs in Minesweeper. Successfully doing so will advance you to a higher level.

Underneath each tile is either a number ranging from 1 to 3, or a Voltorb. Uncovering a Voltorb results in an instant game-over, and your
level will be dropped down. However, uncovering a number will multiply your current score by that number. For instance, if your score is
4 and you uncover a x3, your score will become 12.

In order to deduce which tiles are numbers and which ones are Voltorbs, you need to use the colored tiles at the end of each row and column.
The **black** number is equal to the sum of all numbers in that row or column, while the **red** number is equal to the total number of Voltorbs
in that row or column.