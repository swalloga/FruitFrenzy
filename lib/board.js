import { sample } from 'lodash';
const Tile = require('./tile');

const fruits = ["apple", "banana", "orange", "lemon", "watermelon"];
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

class Board {
  constructor() {
    this.drawBoard();
  }

  drawBoard() {
    context.fillStyle = "#5fe84691";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const tileSize = 36;

    let grid = [
      [],[],[],[],[],[],[],[]
    ];
    let x, y;
    let currentFruit;
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 8; r++) {
        currentFruit = _.sample(fruits);
        x = r * tileSize;
        y = (c * tileSize)/2;
        grid[c].push(new Tile(currentFruit, x, y, tileSize, context));
      }
    }
  }

  updateBoard() {
    let grid = [];
    let currentFruit;
    for (let c = 0; c < 8; c++) {
      for (let r = 0; r < 8; r++) {
        // check if tile is gone and drop tile from above or generate a new one
      }
    }
  }
}

export default Board;
