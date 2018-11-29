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
    let offset = 6;
    let width = tileSize - offset;
    let height = (tileSize - offset)/2;

    this.context.fillStyle = "white";
    this.context.fillRect(x + 3, y + 3, width, height);
    // this.context.font = '12px Indie Flower';
    // this.context.fillStyle = 'black';
    // this.context.textAlign = 'center';
    // this.context.fillText(this.type, x + height, (y + offset * 2) + width /2);
  }
}

module.exports = Tile;
