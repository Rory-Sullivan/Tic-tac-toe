// Function for making a move and checking if there is a winner.

function makeMove(gameBoard, playerNo, position) {
  // Make the move.
  gameBoard[position] = playerNo;

  // Function for checking if three values are equal.
  function checkThree() {
    if (check1 == check2 && check1 == check3 && check1 == playerNo) {
      return true;
    }
    return false;
  }

  // Check if it was a winning move.
  let check1;
  let check2;
  let check3;

  // Check rows
  for (let i = 0; i < 3; i++) {
    check1 = gameBoard[i * 3];
    check2 = gameBoard[i * 3 + 1];
    check3 = gameBoard[i * 3 + 2];

    if (checkThree()) {
      return [true, playerNo];
    }
  }

  // Check columns.
  for (let i = 0; i < 3; i++) {
    check1 = gameBoard[i];
    check2 = gameBoard[i + 3];
    check3 = gameBoard[i + 6];

    if (checkThree()) {
      return [true, playerNo];
    }
  }

  // Check Diagonals.
  check1 = gameBoard[0];
  check2 = gameBoard[4];
  check3 = gameBoard[8];
  if (checkThree()) {
    return [true, playerNo];
  }

  check1 = gameBoard[2];
  check2 = gameBoard[4];
  check3 = gameBoard[6];
  if (checkThree()) {
    return [true, playerNo];
  }

  // If there is no winner.
  if (playerNo == 1) {
    playerNo = 2;
  } else {
    playerNo = 1;
  }
  return [false, playerNo];
}

//Exports
export { makeMove };
