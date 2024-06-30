/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: TicTacToe
@author: Benjamin
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const x = "x";
const o = "o";
const background = "b";
let turn = false;
let board = [
  [1,3.5,3],
  [4.5,2.5,0.5],
  [2,1.5,4]
];

setLegend(
  [ player, bitmap`
................
................
................
................
................
.....000000.....
.....0....0.....
.....0.00.0.....
.....0.00.0.....
.....0....0.....
.....000000.....
................
................
................
................
................` ],
  [ x, bitmap`
................
................
................
................
................
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
................
................
................
................
................`],
  [ o, bitmap`
................
................
................
................
................
.....555555.....
.....5....5.....
.....5....5.....
.....5....5.....
.....5....5.....
.....555555.....
................
................
................
................
................`],
  [ background, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`]
);


const level = map`
...
.p.
...`;

setMap(level);

setSolids ([ x, o]);
setBackground(background);


const restartGame = async () => {
  // Remove all x's
  getAll(x).forEach((x) => {
    x.remove();
  });
  // Remove all o's
  getAll(o).forEach((o) => {
    x.remove();
  });
}

function checkSum(sum) {
  if (sum == 30) {
    console.log("O won");
    sum=0
  } else if (sum == 15) {
    console.log("X won");
    sum=0
  }
}

// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  console.log("Board:", board);

  let playerPosition = [getFirst(player).x, getFirst(player).y];
  
  // Check if can place in tile
  if (getTile(playerPosition[0], playerPosition[1]).length > 1) {
    return;
  }
  
  if (!turn) {
    // Place X
    addSprite(playerPosition[0], playerPosition[1], x);
    board[playerPosition[1]][playerPosition[0]]*=2;
  }
  else {
    // Place O
    addSprite(playerPosition[0], playerPosition[1], o);

    //Adjust magic board
    board[playerPosition[1]][playerPosition[0]]*=4;
  }

  // Check for winner using magic square
  
  // Check rows
  let sum = 0;
  for (let j = 0; j<3;j++) {
    for (let i = 0; i<3;i++) { 
      sum = sum + board[j][i];
    }
    checkSum(sum)
    sum=0
  }
  // Check diagonals
  console.log("here")
  for (let i = 0; i<3;i++) { 
    sum = sum + board[i][i];
  }
  checkSum(sum)
  sum=0

  for (let i = 2; i > -1;i--) { 
    console.log("i",i)
    sum = sum + board[i][i];
  }
  checkSum(sum)
  sum=0

  
  turn = !turn;
});
