/**
 * Artificial intelligence for the user to play against.
 * AI2 (MEDIUM)
 * This AI will try to block the user from completing three in a row and try to
 * finish its own three in a row.
 */
import { AI1_Move } from './AI1.js';

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
 * Move function for AI2 (Medium)
 */
function AI2_Move(game) {
    let position;
    let tempPosition;

    // First check for a winning move.
    tempPosition = findNearComplete(game, 2);
    if (tempPosition !== -1) {
        position = tempPosition;
        return position;
    }

    // If no winning move check if opponent has a winning move.
    tempPosition = findNearComplete(game, 1);
    if (tempPosition !== -1) {
        position = tempPosition;
        return position;
    }

    // If neither of the above make a random move.
    position = AI1_Move(game);
    return position;
}

/**
 * Searches for a row, column or diagonal that is one move away from being
 * completed, a "near complete".
 */
function findNearComplete(game, player) {
    // Variable that will contain the position of the empty square in the
    // case where we find a near complete, -1 if none found.
    let emptyPosition = -1;
    let checkPosition;
    let check1;
    let check2;
    let check3;

    // Check rows, columns and diagonals.
    let i = 0;
    for (let set of game.getAll()) {
        check1 = set[0];
        check2 = set[1];
        check3 = set[2];
        checkPosition = checkNearComplete(check1, check2, check3);
        if (checkPosition !== 0) {
            if (i < 3) {
                emptyPosition = checkPosition - 1 + i * 3;
            } else if (3 <= i && i < 6) {
                emptyPosition = (checkPosition - 1) * 3 + (i - 3);
            } else if (i === 6) {
                emptyPosition = (checkPosition - 1) * 4;
            } else {
                emptyPosition = 2 + (checkPosition - 1) * 2;
            }
            return emptyPosition;
        }
        i++;
    }

    return emptyPosition;

    function checkNearComplete(check1, check2, check3) {
        if (check1 == player && check2 == player && check3 == 0) {
            return 3;
        } else if (check1 == player && check2 == 0 && check3 == player) {
            return 2;
        } else if (check1 == 0 && check2 == player && check3 == player) {
            return 1;
        } else {
            return 0;
        }
    }
}

export { AI2_Move, findNearComplete };
