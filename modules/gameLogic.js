/**
 * Controls game flow for our Tic-tac-toe game.
 */

function makeMove(game, position) {
  game.board[position] = game.playerTurn;

  // Iterate move count.
  // Do this before checking for a winner so that we can check for a draw.
  game.moves++;

  checkForWinner(game);

  // Swap players.
  // Note we must do this after checking for a winner.
  if (game.playerTurn === 1) {
    game.playerTurn = 2;
  } else {
    game.playerTurn = 1;
  }

  // If there is a winner update our win counters.
  if (game.winner) {
    game.rounds++;
    if (game.winner === -1) {
      game.draws++;
    } else {
      game[`p${game.winner}Wins`]++;
    }
  }
}

function checkForWinner(game) {
  let checkValues;

  // Check rows, columns and diagonals for a winner.
  for (const checkObj of game.getAll()) {
    checkValues = checkObj.values;

    if (checkThree(checkValues)) {
      game.winner = game.playerTurn;
      game.winningPositions = checkObj.positions;
      return; // So that we don't check for a draw.
    }
  }

  // Check if it is a draw.
  if (game.moves === 9) {
    game.winner = -1;
  }

  function checkThree(checkValues) {
    if (
      checkValues[0] === checkValues[1] &&
      checkValues[0] === checkValues[2] &&
      checkValues[0] === game.playerTurn
    ) {
      return true;
    }
    return false;
  }
}

export { makeMove, checkForWinner };
