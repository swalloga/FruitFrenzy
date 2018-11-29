class Tile {
  constructor(type, x, y, tileSize, context) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.context = context;

    this.drawTile();
  }

  drawTile() {
    this.context.fillStyle = "white";
    this.context.fillRect(this.x, this.y, this.tileSize, this.tileSize);
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x + 1, this.y + 1, this.tileSize - 2, this.tileSize - 2);
  }
}

module.exports = Tile;
