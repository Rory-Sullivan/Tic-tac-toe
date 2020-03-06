// Imports
import { makeMove } from './modules/gameLogic.js';

// Create game object to keep track of scores and the game board.
let game = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  moves: 0,
  winner: -1, // Value for testing if there is a winner.
  // -1: no winner, 0: draw, 1: player1 wins, 2: player2 wins.
  playerTurn: 1, // Player 1 will start.
  players: 2, // Number of user players (1 or 2).
  p1Wins: 0,
  p2Wins: 0,
  draws: 0,
  rounds: 0
};

// Attach game buttons to function.
let gameButtons = document.querySelectorAll('#buttons button');
for (let button of gameButtons) {
  button.onclick = pressed;
}

// Make a move and check for winner when a game button is pressed.
function pressed(event) {
  let position = event.target.value;
  event.target.disabled = true;

  let symbol;

  if (game.playerTurn == 1) {
    symbol = 'X';
  } else {
    symbol = 'O';
  }
  event.target.innerHTML = symbol;

  makeMove(game, position);

  if (game.winner !== -1) {
    for (let button of gameButtons) {
      button.disabled = true;
    }

    if (game.winner === 0) {
      document.getElementById('winner').innerHTML = 'Draw';
    } else {
      document.getElementById(
        'winner'
      ).innerHTML = `Player ${game.winner} wins.`;
    }
  }
}