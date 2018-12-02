class Tile {
  constructor(type, r, c, tileSize, context) {
    this.type = type;
    this.r = r;
    this.c = c;
    this.tileSize = tileSize;
    this.context = context;
    if (this.type) {
      this.drawTile();
    }
  }

  clear() {
    let x = this.c * this.tileSize;
    let y = (this.r * this.tileSize)/2;
    let offset = 2;
    let width = this.tileSize - offset;
    let height = (this.tileSize - offset)/2;
    this.context.clearRect(x, y, width, height);
  }

  drawTile() {
    let x = this.c * this.tileSize;
    let y = (this.r * this.tileSize)/2;
    let offset = 2;
    let width = this.tileSize - offset;
    let height = (this.tileSize - offset)/2;

    this.context.fillStyle = "white";
    this.context.fillRect(x + offset/2, y + offset/2, width, height);
    this.context.font = "12px Indie Flower, Arial";
    this.context.textAlign = "center";
    this.context.fillStyle = "black";
    this.context.fillText(this.type, x + width/2, y + height/2);
  }
}

module.exports = Tile;
