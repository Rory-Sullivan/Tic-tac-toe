/*
Controls game flow for our Tic-tac-toe game.
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
  checkForWinner();

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

  function checkForWinner() {
    let check1;
    let check2;
    let check3;

    // Check rows
    for (let i = 0; i < 3; i++) {
      check1 = game.board[i * 3];
      check2 = game.board[i * 3 + 1];
      check3 = game.board[i * 3 + 2];
      if (checkThree(check1, check2, check3)) {
        game.winner = game.playerTurn;
        return true;
      }
    }

    // Check columns.
    for (let i = 0; i < 3; i++) {
      check1 = game.board[i];
      check2 = game.board[i + 3];
      check3 = game.board[i + 6];
      if (checkThree(check1, check2, check3)) {
        game.winner = game.playerTurn;
        return true;
      }
    }

    // Check Diagonals.
    check1 = game.board[0];
    check2 = game.board[4];
    check3 = game.board[8];
    if (checkThree(check1, check2, check3)) {
      game.winner = game.playerTurn;
      return true;
    }
    check1 = game.board[2];
    check2 = game.board[4];
    check3 = game.board[6];
    if (checkThree(check1, check2, check3)) {
      game.winner = game.playerTurn;
      return true;
    }

    // Check if it is a draw.
    if (game.moves === 9) {
      game.winner = 0;
      return true;
    }
    return false;
  }

  function checkThree(check1, check2, check3) {
    if (check1 == check2 && check1 == check3 && check1 == game.playerTurn) {
      return true;
    }
    return false;
  }
}

//Exports
export { makeMove };
