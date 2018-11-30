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
    const x = new Board();
    this.grid = x.grid;
    this.rowCount = this.grid.length;
    this.colCount = this.grid[0].length;
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
            matchLength = 1;
          }
        }

        if (clusterEnd && matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            clusters.push([r, c - i]);
          }
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
            matchLength = 1;
          }
        }

        if (clusterEnd && matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            clusters.push([r - i, c]);
          }
          matchLength = 1;
        }
      }
    }
    return(clusters.sort());
  }
// end class
}
