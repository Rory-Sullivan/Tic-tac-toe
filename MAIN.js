import Game from './modules/Game.js';
import { makeMove } from './modules/gameLogic.js';
import { AI1_Move } from './modules/AI1.js';
import { AI2_Move } from './modules/AI2.js';
import { AI3_Move } from './modules/AI3.js';

const gameButtons = document.querySelectorAll('#board button');
gameButtons.forEach((button) => {
  button.onclick = pressed;
});

const newGameSelector = document.getElementById('gameMode');
newGameSelector.onchange = newGame;

const resetButton = document.getElementById('reset');
resetButton.onclick = reset;

const game = new Game();

modeSelector(); // Adds game.mode with default setting.

function modeSelector() {
  game.mode = parseInt(newGameSelector.value);
}

// Make a move and check for winner when a game button is pressed.
function pressed(event) {
  const targetButton = event.target;
  const position = targetButton.value;
  targetButton.disabled = true;

  // Place 'X' or 'O' on board.
  let symbol;
  if (game.playerTurn === 1) {
    symbol = 'X';
  } else {
    symbol = 'O';
  }
  targetButton.innerHTML = symbol;

  makeMove(game, position);

  if (game.winner) {
    for (const button of gameButtons) {
      button.disabled = true;
      button.style.color = 'grey';
    }
    for (const position of game.winningPositions) {
      if (game.winner === 1) {
        gameButtons[position].style.color = 'lime';
      } else if (game.winner === 2) {
        gameButtons[position].style.color = 'red';
      }
    }

    if (game.winner === -1) {
      document.getElementById('playerStatus').innerHTML = 'Draw!';
    } else {
      document.getElementById(
        'playerStatus'
      ).innerHTML = `Player ${game.winner} wins!`;
    }

    // Update the metrics
    document.getElementById('p1Wins').innerHTML = game.p1Wins;
    document.getElementById('p2Wins').innerHTML = game.p2Wins;
    document.getElementById('draws').innerHTML = game.draws;
    document.getElementById('rounds').innerHTML = game.rounds;
  }
  // If there is no winner.
  else {
    // Update the displayed turn counter.
    document.getElementById(
      'playerStatus'
    ).innerHTML = `Player ${game.playerTurn}`;

    // Make the computer play if needed.
    if (game.mode !== 0 && game.playerTurn === 2) {
      makeAIMove();
    }
  }
}

function makeAIMove() {
  let position;

  // Get position for the move.
  if (game.mode === 1) {
    position = AI1_Move(game);
  } else if (game.mode === 2) {
    position = AI2_Move(game);
  } else if (game.mode === 3) {
    position = AI3_Move(game);
  }

  // Trigger the appropriate button.
  gameButtons[position].click();
}

function newGame() {
  game.playerTurn = 1;
  game.p1Wins = 0;
  game.p2Wins = 0;
  game.draws = 0;
  game.rounds = 0;

  // Update the metrics
  document.getElementById('p1Wins').innerHTML = game.p1Wins;
  document.getElementById('p2Wins').innerHTML = game.p2Wins;
  document.getElementById('draws').innerHTML = game.draws;
  document.getElementById('rounds').innerHTML = game.rounds;

  modeSelector();

  reset();
}

// Start a new round when reset button is pressed.
function reset() {
  game.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  game.moves = 0;
  game.winner = 0;
  game.winningPositions = [];

  document.getElementById(
    'playerStatus'
  ).innerHTML = `Player ${game.playerTurn}`;

  for (const button of gameButtons) {
    button.innerHTML = null;
    button.disabled = false;
    button.style.color = null;
  }

  // Make an AI move if the computer is starting.
  if (game.mode !== 0 && game.playerTurn === 2) {
    makeAIMove();
  }
}
