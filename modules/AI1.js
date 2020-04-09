/**
 * Artificial intelligence for the user to play against.
 * AI1 (EASY)
 * This AI simply makes a random move from the possible moves.
 */

/**
 * Move function for AI1 (EASY)
 */
function AI1_Move(game) {
  // Get a random move.
  let position = getRandInt(0, 8);
  const origPosition = position; // Original position.

  /*
    Starting from our random position we iterate through the board until we
    find an available move.
    */
  while (game.board[position] !== 0) {
    position++;

    // Wrap if we reach the end of the board.
    if (position === 9) {
      position = 0;
    }

    // Make sure we don't have an infinite loop.
    if (position === origPosition) {
      throw 'No possible move';
    }
  }
  return position;
}

/**
 * Gets a random integer between the two input values (inclusive).
 */
function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randNum = Math.random();
  return Math.floor(randNum * (max - min + 1)) + min;
}

export { AI1_Move };
