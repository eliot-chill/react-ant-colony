export class Ant {
  x;
  y;
  p5;

  constructor(x, y, p5) {
    this.x = x;
    this.y = y;

    this.p5 = p5;
  }

  draw(img) {
    //this.p5.ellipse(this.x, this.y, 50);
    this.p5.image(img, this.x, this.y);
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }
}
