export class Food {
  /* Graphics Buffer */
  pg;

  x;
  y;

  constructor(pg, x, y) {
    this.pg = pg;

    this.x = x;
    this.y = y;
  }

  draw(size) {
    this.pg.push();
    this.pg.fill(255, 204, 0);
    this.pg.square(this.x + size / 2, this.y + size / 2, size);
    this.pg.pop();
  }
}
