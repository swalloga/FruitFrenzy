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
    let offset = 0;
    let width = this.tileSize - offset;
    let height = this.tileSize - offset;
    let icon = this.createIconImage();
    this.context.drawImage(icon, x + offset/2, y + offset/2, width, height);
  }

  clear() {
    let x = this.c * this.tileSize;
    let y = this.r * this.tileSize;
    let offset = 0;
    let width = this.tileSize - offset;
    let height = this.tileSize - offset;
    this.context.clearRect(x, y, width, height);
  }

  // move(newR, newC) {
  //   let currentX = this.c * this.tileSize;
  //   let currentY = this.r * this.tileSize;
  //   let newX = newC * this.tileSize;
  //   let newY = newR * this.tileSize;
  //   let xVel = 5;
  //   let yVel = 5;
  //   while (currentX !== newX || currentY !== newY) {
  //     if (newX > currentX) {
  //       currentX += xVel;
  //     } else if (newX < currentX) {
  //       currentX -= xVel;
  //     }
  //     if (newY > currentY) {
  //       currentY += yVel;
  //     } else if (newY < currentY) {
  //       currentY -= yVel;
  //     }
  //   }
  // }
}

module.exports = Tile;
