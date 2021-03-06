import AI1_Move from './AI1.js';
import { findNearComplete } from './AI2.js';

function randMoveFromList(list) {
  const len = list.length;
  const randSelection = Math.floor(Math.random() * len);
  return list[randSelection];
}

/**
 * Artificial intelligence for the user to play against.
 * AI3 (HARD)
 * This AI plays so that it cannot be beaten.  For more info check the
 * documentation.
 */
export default function AI3_Move(game) {
  // Computer starting.
  if (game.moves === 0) {
    // Make a random move.
    return AI1_Move(game);
  }
  if (game.moves === 2) {
    // If centre is open take it.
    if (game.board[4] === 0) {
      return 4;
    }

    // Else we can play anywhere.
    return AI1_Move(game);
  }

  // User starting.
  if (game.moves === 1) {
    // User plays centre. Play a corner.
    if (game.board[4] === 1) {
      const corners = [0, 2, 6, 8];
      return randMoveFromList(corners);
    }

    // Else play centre.

    return 4;
  }

  // If we are further on in the game we play with our strategy.

  let position;

  // First check if the computer has a winning move and play.
  position = findNearComplete(game, 2);
  if (position !== -1) {
    return position;
  }

  // Check if opponent has a winning move and block.
  position = findNearComplete(game, 1);
  if (position !== -1) {
    return position;
  }

  // If opponent has played an edge with adjacent corners empty we should
  // play one of those corners.
  if (game.board[1] === 1 && game.board[0] === 0 && game.board[2] === 0) {
    return randMoveFromList([0, 2]);
  }
  if (game.board[5] === 1 && game.board[2] === 0 && game.board[8] === 0) {
    return randMoveFromList([2, 8]);
  }
  if (game.board[7] === 1 && game.board[8] === 0 && game.board[6] === 0) {
    return randMoveFromList([6, 8]);
  }
  if (game.board[3] === 1 && game.board[0] === 0 && game.board[6] === 0) {
    return randMoveFromList([0, 6]);
  }

  // Otherwise play an edge if one is available.
  const emptyEdges = [];
  if (game.board[1] === 0) {
    emptyEdges.push(1);
  }
  if (game.board[3] === 0) {
    emptyEdges.push(3);
  }
  if (game.board[5] === 0) {
    emptyEdges.push(5);
  }
  if (game.board[7] === 0) {
    emptyEdges.push(7);
  }

  if (emptyEdges.length !== 0) {
    return randMoveFromList(emptyEdges);
  }

  // Otherwise play any available move.
  for (let i = 0; i < 9; i += 1) {
    if (game.board[i] === 0) {
      return i;
    }
  }

  // If we make it this far something is wrong.
  throw new Error('Error: Did not return a move from AI3_Move');
}
