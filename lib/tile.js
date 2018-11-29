class Tile {
  constructor(type, x, y, tileSize, context) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.context = context;
    this.drawTile(x, y, tileSize, tileSize);
  }

  drawTile(x, y, tileSize) {
    this.context.beginPath();
    this.context.fillStyle = "white";
    this.context.fillRect(x + 3, y + 3, tileSize - 6, (tileSize - 6)/2);
    this.context.closePath();
    // this.context.beginPath();
    // this.context.font = '12px Indie Flower';
    // this.context.fillStyle = 'black';
    // this.context.textAlign = 'center';
    // this.context.fillText(this.type, x + tileSize/2, y + 10 + tileSize /2);
    // this.context.fillStyle = 'red';
    // this.context.fillRect(this.x + 1, this.y + 1, this.tileSize - 2, this.tileSize - 2);
  }
}

module.exports = Tile;
