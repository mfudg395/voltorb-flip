# voltorb-flip
A re-creation of Voltorb Flip, a Minesweeper-Picross style puzzle minigame.

[**Click here to view and play a live version.**](https://mfudg395.github.io/voltorb-flip/)

## Origin
Voltorb Flip is a minigame available in certain releases of Pokemon HeartGold and Pokemon SoulSilver on the Nintendo DS. In the game,
players can earn coins by progressing through higher levels that can then be spent on rewards.

The game has been described as a mix of Minesweeper and Picross, and it requires a combination of thinking skill and luck in order to
win.

## Rules
The objective of Voltorb Flip is to uncover every point-earning tile on the board without uncovering a single Voltorb. Successfully doing 
so will advance you to a higher level, up until Level 8 which is the highest level.

Underneath each tile is either a number ranging from 1 to 3, or a Voltorb (with Voltorbs being represented by 0s). Uncovering a Voltorb 
results in an instant game-over, and your level will reset to 1. However, uncovering a number will increase your score. If your current
score is 0 because you've just started that level, then it will be increased by that number. Otherwise, it will be multiplied by that number;
for instance, if your current score is 4 and you uncover a 3, your current score will become 12.

In order to deduce which tiles are numbers and which ones are Voltorbs, you need to use the colored boxes at the end of each row and column.
The number in the **above** rectangle is equal to the sum of all numbers in that given row or column. The number in the **below** rectangle
is equal to the sum of all Voltorbs in that row or column. Every row and column displays this information.

A level is cleared when all 2s and 3s have been uncovered. Higher levels have more 2s and 3s to earn you more points, but they also have more
Voltorbs. It's up to you to figure out which is which and achieve as high a score as possible.

[A more detailed explanation on the game can be found on Bulbapedia, the Pokemon encyclopedia.](https://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip)

## A bit about this project
I made this as a way of practicing JavaScript. I've been studying the language while in quarantine in preparation for my upcoming semester at
university, where I'll be taking another web development course. Finding a fun project to work on seemed like a good way to learn, so I made this.

Because of that, it's *probably* not the most elegant piece of code ever written. At the time of writing this, I'm still a JS newbie - once I learn
more, hopefully I'll come back and clean up some it. But for now, it works, and I hope it's fun to play.

**PS. I did all the testing for this on Chrome. It seems to work on Firefox as well, but I can't be certain with other browsers - sorry! :(**