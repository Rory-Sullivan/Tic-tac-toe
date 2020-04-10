import { checkForWinner } from './gameLogic.js';

function miniMaxifyWinner(winner) {
  if (winner === -1) {
    return 0;
  }
  if (winner === 1) {
    return 1;
  }
  if (winner === 2) {
    return -1;
  }
  return 'no winner';
}

function minimax(game) {
  const scores = [];
  game.board.forEach((position) => {
    if (position === 0) {
      position = game.playerTurn;
      game.moves += 1;
      checkForWinner(game);

      if (game.winner) {
        scores.push({ position, val: miniMaxifyWinner(game.winner) });
      } else {
        game.playerTurn = game.playerTurn === 1 ? 2 : 1;
        scores.push(minimax(game));
        game.playerTurn = game.playerTurn === 1 ? 2 : 1;
      }

      // As we are not copying the game object it is important to reset the
      // values.
      position = 0;
      game.moves -= 1;
      game.winner = 0;
    }
  });

  // Player 1 is the maximising player, player 2 is the minimising player.
  if (game.playerTurn === 1) {
    return Math.max(scores, (score) => score.val);
  }
  return Math.min(scores, (score) => score.val);
}

/**
 * AI4 (impossible)
 *
 * Implements the minimax algorithm to solve for the optimum solution.
 */
export default function AI4_Move(game) {
  return minimax(game).position;
}
