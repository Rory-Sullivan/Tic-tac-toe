export default class Game {
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.moves = 0;
    this.winner = 0; // Value for testing if there is a winner.
    // -1: draw, 0: no winner, 1: player1 wins, 2: player2 wins.
    this.winningPositions = []; // Board positions that resulted in a win.
    // Used for highlighting winning tokens.
    this.playerTurn = 1; // Player 1 will start.
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.draws = 0;
    this.rounds = 0;
  }

  getRows() {
    const row0 = {
      positions: [0, 1, 2],
      values: [this.board[0], this.board[1], this.board[2]],
    };
    const row1 = {
      positions: [3, 4, 5],
      values: [this.board[3], this.board[4], this.board[5]],
    };
    const row2 = {
      positions: [6, 7, 8],
      values: [this.board[6], this.board[7], this.board[8]],
    };
    return [row0, row1, row2];
  }

  getColumns() {
    const column0 = {
      positions: [0, 3, 6],
      values: [this.board[0], this.board[3], this.board[6]],
    };
    const column1 = {
      positions: [1, 4, 7],
      values: [this.board[1], this.board[4], this.board[7]],
    };
    const column2 = {
      positions: [2, 5, 8],
      values: [this.board[2], this.board[5], this.board[8]],
    };
    return [column0, column1, column2];
  }

  getDiagonals() {
    const diagonal0 = {
      positions: [0, 4, 8],
      values: [this.board[0], this.board[4], this.board[8]],
    };
    const diagonal1 = {
      positions: [2, 4, 6],
      values: [this.board[2], this.board[4], this.board[6]],
    };
    return [diagonal0, diagonal1];
  }

  getAll() {
    const rows = this.getRows();
    const columns = this.getColumns();
    const diagonals = this.getDiagonals();
    return [
      rows[0],
      rows[1],
      rows[2],
      columns[0],
      columns[1],
      columns[2],
      diagonals[0],
      diagonals[1],
    ];
  }
}
