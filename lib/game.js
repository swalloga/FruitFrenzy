import Board from './board';

// initiate game by clicking play button
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', play, false);
function play() {
  new Game();
}

class Game {
  constructor() {
    this.board = new Board();
    this.grid = this.board.grid;
    this.moves = this.findMoves();
    window.grid = this.grid;
    window.board = this.board;
  }

  findMoves() {
    let moves = [];

    return moves;
  }

  validMove(pos1r, pos1c, pos2r, pos2c) {
    if (this.moves.include([[pos1r, pos1c], [pos2r, pos2c]])) {
      return true;
    } else if (this.moves.include([[pos2r, pos2c], [pos1r, pos1c]])) {
      return true;
    } else {
      return false;
    }
  }

  makeMove(pos1r, pos1c, pos2r, pos2c) {
    if (this.validMove) {
      // QUESTION: does this swap logic work?
      this.grid[pos1r][pos1c] = this.grid[pos2r][pos2c];
    }
  }

// end class
}
