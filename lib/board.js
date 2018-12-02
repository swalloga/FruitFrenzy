import { sample } from 'lodash';
const Tile = require('./tile');

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const FRUITS = [
  "apple",
  "banana",
  "orange",
  "lemon",
  "watermelon"
];
const tileSize = (canvas.width - 1)/6;

class Board {
  constructor() {
    this.grid = this.drawBoard();
  }

  drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#5fe84691";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let grid = [
      [],[],[],[],[],[]
    ];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
        let currentFruit = _.sample(FRUITS);
        grid[r].push(new Tile(currentFruit, r, c, tileSize, context));
      }
    }
    return grid;
  }

  addNewTile(r, c) {
    let currentFruit = _.sample(FRUITS);
    this.grid[r][c] = new Tile(currentFruit, r, c, tileSize, context);
  }

  addNullTile(r, c) {
    this.grid[r][c] = new Tile(null, r, c, tileSize, context);
    this.grid[r][c].clear();
  }

  updateTile(r, c) {
    this.grid[r][c].drawTile();
  }
}

export default Board;
