/**
 * Artificial intelligence for the user to play against.
 * AI1 (EASY)
 * This AI simply makes a random move from the possible moves.
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

/**
 * Move function for AI1 (Easy)
 */
function AI1_Move(game) {
  // Get a random move.
  let position = getRandInt(0, 8);
  let origPosition = position; // Original position.

  // Make sure it is a valid move.
  while (game.board[position] !== 0) {
    position++;

    // Wrap if we reach the end of the board.
    // This is necessary because we may not start at the beginning of the board.
    if (position === 9) {
      position = 0;
    }

    // Make sure we don't have an infinite loop.
    if (position === origPosition) {
      throw 'No possible move';
    }
  }
  return position;

  /**
   * Gets a random integer between the two input values (inclusive).
   */
  function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let randNum = Math.random();
    return Math.floor(randNum * (max - min + 1)) + min;
  }
}

export { AI1_Move };

// Testing code.
// console.log(getRandInt(10, 99));

// let game = {
//   board: [1, 1, 1, 1, 1, 1, 0, 1, 1]
// };

// console.log(AI1_Move(game));
