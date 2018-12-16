import Board from './board';

// initial game and board set up
document.addEventListener('DOMContentLoaded', () => play());

// initiate new game by clicking play button
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', () => {
  play();
});

let target = document.getElementById("instruction-div");
let cog = document.getElementById("cog-icon");
const handleClick = (e) => {
  e.preventDefault();
  if (e.target === target || e.target === cog) {
    $( "#instruction-div" ).toggleClass("show");
    $( "#instruction-div" ).toggleClass("hide");
  }
};
cog.addEventListener('click', handleClick);
target.addEventListener('click', handleClick);

function play() {
  new Game();
}

class Game {
  constructor() {
    const canvas = document.getElementById("myCanvas");
    this.tileSize = 65;
    this.board = new Board();
    this.grid = this.board.grid;
    this.firstTilePos = null;

    this.getFirstTilePos = this.getFirstTilePos.bind(this);
    this.handleMove = this.handleMove.bind(this);
    $("#myCanvas").on('mousedown', this.getFirstTilePos);
    $("#myCanvas").on('mouseup', this.handleMove);
    $("#shuffle-button").on('click', this.board.drawNewBoard);
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
}
