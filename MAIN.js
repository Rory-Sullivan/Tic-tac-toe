/*
Controls event listeners and display for our Tic-tac-toe game.
*/

// Imports
import { makeMove } from './modules/gameLogic.js';
import { AI1_Move } from './modules/AI1.js';
import { AI2_Move } from './modules/AI2.js';
import { AI3_Move } from './modules/AI3.js';

// Attach game buttons to function.
let gameButtons = document.querySelectorAll('#board button');
for (let button of gameButtons) {
    button.onclick = pressed;
}

// Attach game mode to function.
let newGameSelector = document.getElementById('gameMode');
newGameSelector.onchange = newGame;

// Attach reset button to function.
let resetButton = document.getElementById('reset');
resetButton.onclick = reset;

// Create our game Object.
let game = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    moves: 0,
    winner: -1, // Value for testing if there is a winner.
    // -1: no winner, 0: draw, 1: player1 wins, 2: player2 wins.
    winningPositions: [],
    playerTurn: 1, // Player 1 will start.
    p1Wins: 0,
    p2Wins: 0,
    draws: 0,
    rounds: 0,

    getRows: function() {
        let row0 = [this.board[0], this.board[1], this.board[2]];
        let row1 = [this.board[3], this.board[4], this.board[5]];
        let row2 = [this.board[6], this.board[7], this.board[8]];
        return [row0, row1, row2];
    },

    getColumns: function() {
        let column0 = [this.board[0], this.board[3], this.board[6]];
        let column1 = [this.board[1], this.board[4], this.board[7]];
        let column2 = [this.board[2], this.board[5], this.board[8]];
        return [column0, column1, column2];
    },

    getDiagonals: function() {
        let diagonal0 = [this.board[0], this.board[4], this.board[8]];
        let diagonal1 = [this.board[2], this.board[4], this.board[6]];
        return [diagonal0, diagonal1];
    },

    getAll: function() {
        let rows = this.getRows();
        let columns = this.getColumns();
        let diagonals = this.getDiagonals();
        return [
            rows[0],
            rows[1],
            rows[2],
            columns[0],
            columns[1],
            columns[2],
            diagonals[0],
            diagonals[1]
        ];
    }
};

modeSelector(); // Adds game.mode with default setting.

// Select mode.
function modeSelector() {
    game.mode = parseInt(newGameSelector.value);
}

// Make a move and check for winner when a game button is pressed.
function pressed(event) {
    let position = event.target.value;
    event.target.disabled = true;

    // Place 'X' or 'O' on board.
    let symbol;
    if (game.playerTurn == 1) {
        symbol = 'X';
    } else {
        symbol = 'O';
    }
    event.target.innerHTML = symbol;

    makeMove(game, position);

    if (game.winner !== -1) {
        // If there is a winner.
        for (let button of gameButtons) {
            button.disabled = true;
            button.style.color = 'grey';
        }
        for (let position of game.winningPositions) {
            if (game.winner === 1) {
                gameButtons[position].style.color = 'lime';
            } else if (game.winner === 2) {
                gameButtons[position].style.color = 'red';
            }
        }

        if (game.winner === 0) {
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
    } else {
        // If there is no winner.
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
    game.winner = -1;
    game.winningPositions = [];

    document.getElementById(
        'playerStatus'
    ).innerHTML = `Player ${game.playerTurn}`;

    for (let button of gameButtons) {
        button.innerHTML = null;
        button.disabled = false;
        button.style.color = null;
    }

    // Make an AI move if the computer is starting.
    if (game.mode !== 0 && game.playerTurn === 2) {
        makeAIMove();
    }
}
