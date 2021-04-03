import { Ant } from "./ant";
import { getRandomInt, getRandomFloat } from "./util.js";

export class Colony {
  /* P5 ! */
  p5;
  pg;

  /* Consts */
  num_ants;
  ant_size = 8;

  ants = []; // Empty ants array

  constructor(pg, num_ants) {
    this.pg = pg;

    this.num_ants = num_ants;
  }

  spawnAnt(x, y) {
    if (this.ants.length >= this.num_ants) {
      this.ants.shift(); // Remove oldest ant
    }
    console.log("Spawning new ant at: " + x + "/" + y + ".");
    var randAngle = getRandomFloat(0, 2 * Math.PI);
    var newAnt = new Ant(this.pg, x, y, this.ant_size, randAngle);
    this.ants.push(newAnt);
  }

  spawnMaxAnts(maxX, maxY) {
    // Randomly placed for now
    for (let i = 0; i < this.num_ants; i++) {
      var x = getRandomInt(0, maxX);
      var y = getRandomInt(0, maxY);
      this.spawnAnt(x, y);
    }
  }

  drawAnts() {
    this.ants.forEach((ant) => {
      ant.draw(this.ant_size);
    });
  }

  update(dt, world) {
    this.ants.forEach((ant) => {
      ant.update(dt, world);
    });
  }
}
