/**
 * Controls game flow for our Tic-tac-toe game.
 */

// Our game object is below for reference.
// let game = {
//   board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   moves: 0,
//   winner: -1, // Value for testing if there is a winner.
//   // -1: no winner, 0: draw, 1: player1 wins, 2: player2 wins.
//   playerTurn: 1, // Player 1 will start.
//   players: 2, // Number of user players (1 or 2).
//   p1Wins: 0,
//   p2Wins: 0,
//   draws: 0,
//   rounds: 0
// };

function makeMove(game, position) {
    // Make the move.
    game.board[position] = game.playerTurn;

    // Iterate move count.
    // Do this before checking for a winner so that we can check for a draw.
    game.moves++;

    // Check if it is a winning move.
    checkForWinner(game);

    // Swap players.
    // Note we must do this after checking for a winner.
    if (game.playerTurn == 1) {
        game.playerTurn = 2;
    } else {
        game.playerTurn = 1;
    }

    // If there is a winner update our win counters and return.
    if (game.winner !== -1) {
        game.rounds++;
        if (game.winner === 0) {
            game.draws++;
        } else {
            game[`p${game.winner}Wins`]++;
        }
        return true;
    }

    // If there is no winner.
    return false;
}

function checkForWinner(game) {
    let check1;
    let check2;
    let check3;

    // Check rows, columns and diagonals for a winner.
    let i = 0;
    for (let set of game.getAll()) {
        check1 = set[0];
        check2 = set[1];
        check3 = set[2];
        if (checkThree(check1, check2, check3)) {
            game.winner = game.playerTurn;

            if (i === 0) {
                game.winningPositions = [0, 1, 2];
            } else if (i === 1) {
                game.winningPositions = [3, 4, 5];
            } else if (i === 2) {
                game.winningPositions = [6, 7, 8];
            } else if (i === 3) {
                game.winningPositions = [0, 3, 6];
            } else if (i === 4) {
                game.winningPositions = [1, 4, 7];
            } else if (i === 5) {
                game.winningPositions = [2, 5, 8];
            } else if (i === 6) {
                game.winningPositions = [0, 4, 8];
            } else if (i === 7) {
                game.winningPositions = [2, 4, 6];
            }

            return true;
        }
        i++;
    }

    // Check if it is a draw.
    if (game.moves === 9) {
        game.winner = 0;
        return true;
    }
    return false;

    function checkThree(check1, check2, check3) {
        if (check1 == check2 && check1 == check3 && check1 == game.playerTurn) {
            return true;
        }
        return false;
    }
}

//Exports
export { makeMove, checkForWinner };
