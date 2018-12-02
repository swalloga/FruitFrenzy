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
    window.grid = this.grid;
    window.board = this.board;
  }

// end class
}
