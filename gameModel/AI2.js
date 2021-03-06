import AI1_Move from './AI1.js';

/**
 * Checks a set of values to see if they are nearly complete.
 *
 * @returns the relative position of the empty value, if the set is not
 * nearly complete returns -1.
 */
function checkNearComplete(checkValues, player) {
  if (
    checkValues[0] === player &&
    checkValues[1] === player &&
    checkValues[2] === 0
  ) {
    return 2;
  }
  if (
    checkValues[0] === player &&
    checkValues[1] === 0 &&
    checkValues[2] === player
  ) {
    return 1;
  }
  if (
    checkValues[0] === 0 &&
    checkValues[1] === player &&
    checkValues[2] === player
  ) {
    return 0;
  }
  return -1;
}

/**
 * Searches for a row, column or diagonal that is one move away from being
 * completed, a "near complete".
 *
 * @returns The value of the empty position in the "near complete", returns -1
 * if no "near complete" is found.
 */
export function findNearComplete(game, player) {
  let emptyPosition = -1;
  let checkValues;
  let checkPosition;

  game.getAll().forEach((checkObj) => {
    checkValues = checkObj.values;

    checkPosition = checkNearComplete(checkValues, player);

    if (checkPosition !== -1) {
      emptyPosition = checkObj.positions[checkPosition];
    }
  });

  return emptyPosition;
}

/**
 * Artificial intelligence for the user to play against.
 * AI2 (MEDIUM)
 * This AI will try to block the user from completing three in a row and try to
 * finish its own three in a row.
 */
export function AI2_Move(game) {
  let position;

  // First check for a winning move.
  position = findNearComplete(game, 2);
  if (position !== -1) {
    return position;
  }

  // Then check if opponent has a winning move.
  position = findNearComplete(game, 1);
  if (position !== -1) {
    return position;
  }

  // If neither of the above make a random move.
  position = AI1_Move(game);
  return position;
}
