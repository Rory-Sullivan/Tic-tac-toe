function checkThree(checkValues, game) {
  if (
    checkValues[0] === checkValues[1] &&
    checkValues[0] === checkValues[2] &&
    checkValues[0] === game.playerTurn
  ) {
    return true;
  }
  return false;
}

function checkForWinner(game) {
  let checkValues;

  game.getAll().forEach((checkObj) => {
    checkValues = checkObj.values;

    if (checkThree(checkValues, game)) {
      game.winner = game.playerTurn;
      game.winningPositions = checkObj.positions;
      // So that we don't check for a draw.
    }
  });

  // Check if it is a draw.
  if (game.moves === 9) {
    game.winner = -1;
  }
}

function makeMove(game, position) {
  game.board[position] = game.playerTurn;

  // Iterate move count.
  // Do this before checking for a winner so that we can check for a draw.
  game.moves += 1;

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
    game.rounds += 1;
    if (game.winner === -1) {
      game.draws += 1;
    } else {
      game[`p${game.winner}Wins`] += 1;
    }
  }
}

export { makeMove, checkForWinner };
