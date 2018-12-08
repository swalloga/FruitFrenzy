import Board from './board';

document.addEventListener('DOMContentLoaded', () => play());
// initiate new game by clicking play button
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', play, false);
function play() {
  new Game();
}

class Game {
  constructor() {
    const canvas = document.getElementById("myCanvas");
    this.tileSize = (canvas.width/6);
    this.board = new Board();
    this.grid = this.board.grid;
    this.firstTilePos = null;
    this.getFirstTilePos = this.getFirstTilePos.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleHover = this.handleHover.bind(this);
    $("#cog-icon").on('click', this.handleClick);
    $("#instruction-div").on('click', this.handleClick);
    $("#myCanvas").on('mousedown', this.getFirstTilePos);
    $("#myCanvas").on('mouseup', this.handleMove);
    $("#myCanvas").on('mouseover', this.handleHover);
    // $("#myCanvas").on('touchstart', this.getFirstTilePos);
    // $("#myCanvas").on('touchend', this.handleMove);
    window.grid = this.board.grid;
    window.board = this.board;
  }

  handleClick(e) {
    let target = document.getElementById("instruction-div");
    let cog = document.getElementById("cog-icon");
    if (e.target === target || e.target === cog) {
      $( "#instruction-div" ).toggleClass("show");
      $( "#instruction-div" ).toggleClass("hide");
    }
  }

  getFirstTilePos(e) {
    let row1 = Math.floor(e.offsetY / this.tileSize);
    let col1 = Math.floor(e.offsetX / this.tileSize);
    this.firstTilePos = [row1, col1];
    return this.firstTilePos;
  }

  handleMove(e) {
    let row2 = Math.floor(e.offsetY / this.tileSize);
    let col2 = Math.floor(e.offsetX / this.tileSize);
    if (this.firstTilePos) {
      const firstTilePos = this.firstTilePos;
      const secondTilePos = [row2, col2];
      this.board.makeMove(firstTilePos, secondTilePos);
      this.firstTilePos = null;
    }
  }

  handleHover(e) {
    let row = Math.floor(e.offsetY / this.tileSize);
    let col = Math.floor(e.offsetX / this.tileSize);
    this.board.colorTileBackground(row, col);
  }

// end class
}
