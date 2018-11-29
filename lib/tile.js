class Tile {
  constructor(type, x, y, tileSize, context) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.context = context;
    this.drawTile(x, y, tileSize);
  }

  drawTile(x, y, tileSize) {
    let offset = 2;
    let width = tileSize - offset;
    let height = (tileSize - offset)/2;

    this.context.fillStyle = "white";
    this.context.fillRect(x + offset/2, y + offset/2, width, height);
    this.context.font = "12px Indie Flower, Arial";
    this.context.textAlign = "center";
    this.context.fillStyle = "black";
    this.context.fillText(this.type, x + width/2, y + height/2);
  }
}

module.exports = Tile;
