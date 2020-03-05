// Imports
import {
  makeMove
} from "./gameLogic.js";

let winner = false;
let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let playerNo = 1;

// Function for when a game button is pressed.
function pressed(event) {
  let position = event.target.value;
  event.target.disabled = true;

  let symbol

  if (playerNo == 1) {
    symbol = 'X';
  } else {
    symbol = 'O';
  }
  event.target.innerHTML = symbol;

  [winner, playerNo] = makeMove(gameBoard, playerNo, position);

  if (winner) {
    for (let button of gameButtons) {
      button.disabled = true;
    }
    document.getElementById('winner').innerHTML = `Player ${playerNo} wins.`;
  }
}

// Attach game buttons to function.
let gameButtons = document.querySelectorAll('#buttons button');
for (let button of gameButtons) {
  button.onclick = pressed;
}
