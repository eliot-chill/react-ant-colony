export class Pheromone {
  /* Graphics Buffer */
  pg;

  x;
  y;
  currentState;
  intensity;

  constructor(pg, x, y, currentState, intensity) {
    this.pg = pg;

    this.currentState = currentState;
    this.intensity = intensity;

    this.x = x;
    this.y = y;
  }

  draw(size) {
    this.pg.push();
    if (this.currentState === States.TO_FOOD) {
      this.pg.fill(36, 145, 240);
    } else if (this.currentState === States.TO_HOME) {
      this.pg.fill(36, 240, 43);
    }
    this.pg.ellipse(this.x, this.y, size * this.intensity);
    this.pg.pop();
  }

  getCoords() {
    // return [Math.round(this.x), Math.round(this.y)];
    return [this.x, this.y];
  }

  getIntensity() {
    return this.intensity;
  }

  update(dt) {
    this.intensity -= 1 * dt;
  }

  destroy() {
    this.intensity = -1;
  }

  isDone() {
    console.log("ph intensity: " + this.intensity);
    return this.intensity < 0;
  }
}

export const States = {
  TO_FOOD: "to_food",
  TO_HOME: "to_home",
};
