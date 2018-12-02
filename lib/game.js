import Board from './board';

// initiate game by clicking play button
const playButton = document.getElementById("play-button");
playButton.addEventListener('click', play, false);
function play() {
  new Game();
}

let clusters;

class Game {
  constructor() {
    this.board = new Board();
    this.grid = this.board.grid;
    this.rowCount = this.grid.length;
    this.colCount = this.grid[0].length;
    this.moves = this.findMoves();
    this.removeClusters(this.findClusters());
    window.grid = this.grid;
    window.board = this.board;
  }

  findClusters() {
    clusters = [];

    // check for horizontal clusters of 3 or more
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
            clusters.push([r, c - i]);
          }
          matchLength = 1;
        } else if (clusterEnd && matchLength < 3) {
          matchLength = 1;
        }
      }
    }
    // check for horizontal clusters of 3 or more
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
            clusters.push([r - i, c]);
          }
          matchLength = 1;
        } else if (clusterEnd && matchLength < 3) {
          matchLength = 1;
        }
      }
    }

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

  removeClusters(uniqClusters) {
    // delete tiles from grid where index is in clusters array using slice and concat
    for (let i = 0; i < uniqClusters.length; i++) {
      let [row, col] = uniqClusters[i];
      this.board.addNullTile(row, col);
    }
    this.shiftTiles();
  }

  // TODO: animation: increment y position of moving tiles with a delay until the taget position is hit and then remove

  shiftTiles() {
    // while the board includes null,
    let gridHasNull = this.grid.flat().some((tile) => !tile.type);
    while (gridHasNull) {
      // iterate through first row, if it includes null, replace null with a new tile
      let firstRow = this.grid[0];
      for (let i = 0; i < firstRow.length; i++) {
        if (!firstRow[i].type) {
          this.board.addNewTile(0, i);
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
              this.board.updateTile(r + 1, c);
              this.board.addNullTile(r, c);
            }
          }
        }
      }
    gridHasNull = this.grid.flat().some((tile) => !tile.type);
    }
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
