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
  for (let i = 0; i < game.board.length; i += 1) {
    if (game.board[i] === 0) {
      game.board[i] = game.playerTurn;
      game.moves += 1;
      checkForWinner(game);

      if (game.winner) {
        scores.push({ position: i, val: miniMaxifyWinner(game.winner) });
      } else {
        game.playerTurn = game.playerTurn === 1 ? 2 : 1;
        scores.push({ position: i, val: minimax(game).val });
        game.playerTurn = game.playerTurn === 1 ? 2 : 1;
      }

      // As we are not copying the game object it is important to reset the
      // values.
      game.board[i] = 0;
      game.moves -= 1;
      game.winner = 0;
    }
  }

  scores.sort((x, y) => x.val - y.val);
  // console.log(scores);

  // Player 1 is the maximising player, player 2 is the minimising player.
  if (game.playerTurn === 1) {
    return scores[scores.length - 1];
  }
  return scores[0];
}

/**
 * AI4 (impossible)
 *
 * Implements the minimax algorithm to solve for the optimum solution.
 */
export default function AI4_Move(game) {
  return minimax(game).position;
}
