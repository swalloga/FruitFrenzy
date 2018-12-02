import { sample } from 'lodash';
const Tile = require('./tile');

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const tileSize = (canvas.width)/6;

const FRUITS = [
  "apple",
  "banana",
  "orange",
  "lemon",
  "watermelon",
  "cherry"
];

// TODO: animation: increment y position of moving tiles with a delay until the taget position is hit and then remove
export default class Board {
  constructor() {
    this.score = 0;
    this.draw = this.draw.bind(this);
    this.grid = this.draw();
    this.rowCount = this.grid.length;
    this.colCount = this.grid[0].length;
    this.removeClusters(this.findClusters());
  }

  draw() {
    $(".player-score").text(`Score: ${this.score}`);
    context.clearRect(0, 0, canvas.width, canvas.height);

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

  updateScore(points) {
    this.score += points;
    $(".player-score").text(`Score: ${this.score}`);
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
    this.grid[r][c].clear();
    debugger
    this.grid[r][c].drawTile();
  }

  findClusters() {
    let vclusters = this.findVerticalClusters();
    let hclusters = this.findHorizontalClusters();
    let clusters = [].concat(vclusters).concat(hclusters);
    // filter clusters for unique indices
    let uniqClusters = [];
    let foundInices = {};
    for (let i = 0; i < clusters.length; i++) {
      let stringIdx = JSON.stringify(clusters[i]);
      if (foundInices[stringIdx]) {
          continue;
        } else {
          uniqClusters.push(clusters[i]);
          foundInices[stringIdx] = true;
        }
      }
    return(uniqClusters.sort());
  }

  findVerticalClusters() {
    let vclusters = [];
    for (let r = 0; r < this.rowCount; r++) {
      let matchLength = 1;
      for (let c = 0; c < this.colCount; c++) {

        let clusterEnd = false;
        if (c === this.colCount - 1) {
          clusterEnd = true;
        } else {
          let currentTile = this.grid[r][c];
          let nextTile = this.grid[r][c + 1];
          if (currentTile.type === nextTile.type) {
            matchLength += 1;
          } else {
            clusterEnd = true;
          }
        }

        if (clusterEnd && matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            vclusters.push([r, c - i]);
          }
          matchLength = 1;
        } else if (clusterEnd && matchLength < 3) {
          matchLength = 1;
        }
      }
    }
    return vclusters;
  }

  findHorizontalClusters() {
    let hclusters = [];
    for (let c = 0; c < this.colCount; c++) {
      let matchLength = 1;
        for (let r = 0; r < this.rowCount; r++) {

        let clusterEnd = false;
        if (r === this.rowCount - 1) {
          clusterEnd = true;
        } else {
          let currentTile = this.grid[r][c];
          let nextTile = this.grid[r + 1][c];
          if (currentTile.type === nextTile.type) {
            matchLength += 1;
          } else {
            clusterEnd = true;
          }
        }

        if (clusterEnd && matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            hclusters.push([r - i, c]);
          }
          matchLength = 1;
        } else if (clusterEnd && matchLength < 3) {
          matchLength = 1;
        }
      }
    }
    return hclusters;
  }

  removeClusters(uniqClusters) {
    // delete tiles from grid where index is in clusters array using slice and concat
    for (let i = 0; i < uniqClusters.length; i++) {
      let [row, col] = uniqClusters[i];
      this.addNullTile(row, col);
      this.updateScore(10);
    }
    this.shiftTiles();
    const newClusters = this.findClusters();
    if (newClusters.length > 0) {
      this.removeClusters(newClusters);
    }
  }

  shiftTiles() {
    // while the board includes null,
    let gridHasNull = this.grid.flat().some((tile) => !tile.type);
    while (gridHasNull) {
      // iterate through first row, if it includes null, replace null with a new tile
      let firstRow = this.grid[0];
      for (let i = 0; i < firstRow.length; i++) {
        if (!firstRow[i].type) {
          this.addNewTile(0, i);
        }
      }
      // then iterate through the board
      for (let r = 0; r < this.grid.length; r++) {
        for (let c = 0; c < this.grid[0].length; c++) {
          // if this row is the last row, continue on
          if (r + 1 === this.grid.length) {
            continue;
          }
          // if this isn't the last row, iterate through each item
          else {
            // if the current item is not null and the index at r + 1 is null
            let currentTile = this.grid[r][c];
            let tileBelow = this.grid[r + 1][c];
            // check if i need to check for the value or if i can just call !tileBelow
            if (!tileBelow.type) {
              // change the position of that tile to be one row lower
              this.grid[r + 1][c] = currentTile;
              currentTile.r = r + 1;
              this.updateTile(r + 1, c);
              this.addNullTile(r, c);
            }
          }
        }
      }
    gridHasNull = this.grid.flat().some((tile) => !tile.type);
    }
  }
// check if tiles are adjacent
  isValidMove(tile1, tile2) {
    const col1 = tile1.c;
    const col2 = tile2.c;
    const row1 = tile1.r;
    const row2 = tile2.r;
    const lastCol = (this.grid.length - 1);
    const lastRow = (this.grid.length - 1);
    if ((col1 === 0) && (col2 !== 0 && col2 !== 1)) {
      return false;
    } else if ((col1 === lastCol) && (col2 !== lastCol && col2 !== col1 - 1)) {
      return false;
    } else if ((row1 === 0) && (row2 !== 0 && row2 !== 1)) {
      return false;
    } else if ((row1 === lastRow) && (row2 !== lastRow && row2 !== row1 - 1)) {
      return false;
    }  else if ((col2 < col1 - 1) || (col2 > col1 + 1)) {
        return false;
    } else if ((row2 < row1 - 1) || (row2 > row1 + 1)) {
      return false;
    } else {
      return true;
    }
  }
// execute swap of positions on grid and update tile to relfect new coordinates
  swapTiles(tile1, tile2) {
    const row1 = tile1.r;
    const row2 = tile2.r;
    const col1 = tile1.c;
    const col2 = tile2.c;

    this.grid[row1][col1] = tile2;
    this.grid[row2][col2] = tile1;
    tile1.r = row2;
    tile1.c = col2;
    tile2.r = row1;
    tile2.c = col1;
    this.updateTile(row1, col1);
    this.updateTile(row2, col2);
  }
// call check if valid move, execute swap and then check if clusters increased based on move.
// if no new clusters, reverse swap
  makeMove(tile1Pos, tile2Pos) {
    const tile1 = this.grid[tile1Pos[0]][tile1Pos[1]];
    const tile2 = this.grid[tile2Pos[0]][tile2Pos[1]];
    if (this.isValidMove(tile1, tile2)) {
      const origClusterCount = this.findClusters().length;
      this.swapTiles(tile1, tile2);
      this.updateTile(tile1.r, tile1.c);
      this.updateTile(tile2.r, tile2.c);
      const newClusterCount = this.findClusters().length;
      if ((newClusterCount - origClusterCount) === 0) {
        this.swapTiles(tile2, tile1);
        this.updateTile(tile1.r, tile1.c);
        this.updateTile(tile2.r, tile2.c);
      } else {
        this.removeClusters(this.findClusters());
      }
    }
  }
}
