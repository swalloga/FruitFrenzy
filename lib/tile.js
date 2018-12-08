const ICONS = {
  apple: './images/apple.png',
  banana: './images/banana.png',
  orange: './images/orange.png',
  lemon: './images/lemon.png',
  watermelon: './images/watermelon.png',
  cherry: './images/cherry.png'
};

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

  createIconImage() {
    let img = new Image();
    img.src = ICONS[this.type];
    return img;
  }

  drawTile() {
    let x = this.c * this.tileSize;
    let y = this.r * this.tileSize;
    let width = this.tileSize;
    let height = this.tileSize;
    let icon = this.createIconImage();
    this.context.drawImage(icon, x, y, width, height);
  }

  drawTileWithBackground() {
    let x = this.c * this.tileSize;
    let y = this.r * this.tileSize;
    let width = this.tileSize;
    let height = this.tileSize;
    let icon = this.createIconImage();
    this.context.clearRect(x, y, width, height);
    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.fillStyle = "lightgray";
    this.context.fill();
    this.context.closePath();
    this.context.drawImage(icon, x, y, width, height);
  }

  clear() {
    let x = this.c * this.tileSize;
    let y = this.r * this.tileSize;
    let offset = 0;
    let width = this.tileSize - offset;
    let height = this.tileSize - offset;
    this.context.clearRect(x, y, width, height);
  }

  clearTemp() {
    let x = this.c * this.tileSize;
    let y = (this.r - 1) * this.tileSize;
    let width = this.tileSize;
    let height = this.tileSize * 2;
    this.context.clearRect(x, y, width, height);
  }

  drawTemp(r, c) {
    let x = c * this.tileSize;
    let y = r * this.tileSize;
    let width = this.tileSize;
    let height = this.tileSize;
    let icon = this.createIconImage();
    this.context.drawImage(icon, x, y, width, height);
  }

}

module.exports = Tile;
