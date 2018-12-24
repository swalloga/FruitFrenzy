const ICONS = {
  apple: './images/apple.png',
  banana: './images/banana.png',
  orange: './images/orange.png',
  lemon: './images/lemon.png',
  watermelon: './images/watermelon.png',
  cherry: './images/cherry.png',
  pineapple: './images/pineapple.png',
  grape: './images/Grape.png',
  kiwi: './images/kiwi.png'
};

class Tile {
  constructor(type, r, c, currentX, currentY, tileSize, context) {
    this.type = type;
    this.currentX = currentX;
    this.currentY = currentY;
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
    let icon = this.createIconImage();

    if (this.currentX < x) {
      this.currentX += 5;
    } else if (this.currentX > x) {
      this.currentX -= 5;
    } else if (this.currentY < y) {
      this.currentY += 5;
    } else if (this.currentY > y) {
      this.currentY -= 5;
    }
    this.context.drawImage(icon, this.currentX, this.currentY, this.tileSize, this.tileSize);
  }

  clear() {
    let x = this.c * this.tileSize;
    let y = this.r * this.tileSize;
    this.context.clearRect(x, y, this.tileSize, this.tileSize);
  }

}

module.exports = Tile;
