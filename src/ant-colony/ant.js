import { Direction } from "./direction.js";
import { Pheromone, States } from "./pheromone.js";
import {
  getRandomFloat,
  getRandomInt,
  getLength,
  dot,
  getAngle,
} from "./util.js";

export class Ant {
  /* P5 ! */
  p5;
  pg;

  /* Position and movement */
  x;
  y;
  size;
  speed = 50;
  direction;
  direction_update_period = 0.125;
  last_direction_update =
    getRandomFloat(0, 100) * 0.01 * this.direction_update_period;
  direction_noise_range = Math.PI * 0.1;

  /* Pheromones */
  pheromone_detection_distance = 40.0;
  pheromone_update_period = 0.25;
  last_pheromone_update =
    getRandomFloat(0, 100) * 0.01 * this.pheromone_update_period;
  ph_reserve = 0;
  max_ph_reserve = 200;
  ph_reserve_consumption = 0.02;
  currentState;

  constructor(pg, x, y, size, angle) {
    this.pg = pg;

    this.x = x;
    this.y = y;
    this.size = size;

    this.direction = new Direction(angle, 2); // Set initial angle and rot speed
    this.ph_reserve = this.max_ph_reserve;

    this.currentState = States.TO_FOOD;
  }

  draw(size) {
    // Center the square on x / y rather than top left corner
    this.pg.push();
    this.pg.fill(0);
    this.pg.square(this.x + size / 2, this.y + size / 2, size);
    this.pg.pop();
  }

  update(dt, world) {
    this.updatePosition(dt, world);
    this.last_direction_update += dt;
    if (this.last_direction_update > this.direction_update_period) {
      this.findPheromones(world);
      this.direction.addVector(getRandomFloat(this.direction_noise_range));
      this.last_direction_update = 0.0;
    }

    this.last_pheromone_update += dt;
    if (this.last_pheromone_update >= this.pheromone_update_period) {
      this.addPheromone(world);
    }
    this.direction.update(dt);
  }

  updatePosition(dt, world) {
    // console.log("Updating position...");
    // console.log(this.x, this.y);
    var dirVector = this.direction.getVector();
    var x = dirVector[0];
    var y = dirVector[1];
    // console.log("DirVector: " + x + "/" + y);

    this.x += dt * this.speed * x;
    this.y += dt * this.speed * y;

    this.x = this.x < 0 ? world.w : this.x;
    this.y = this.y < 0 ? world.h : this.y;

    this.x = this.x > world.w ? 0 : this.x;
    this.y = this.y > world.h ? 0 : this.y;

    // console.table(this.x, this.y);
  }

  addPheromone(world) {
    if (this.ph_reserve > 1.0) {
      var newPh = new Pheromone(
        this.pg,
        this.x,
        this.y,
        this.currentState == States.TO_FOOD ? States.TO_HOME : States.TO_FOOD,
        this.ph_reserve * this.ph_reserve_consumption
      );
      world.addPheromone(newPh);
      this.ph_reserve *= 1.0 - this.ph_reserve_consumption;
    }
    this.last_pheromone_update = 0.0;
  }

  findPheromones(world) {
    var ph_arr = world.getPheromones(this.x, this.y, this.size);
    var total_intensity = 0;
    var point = [0, 0];
    var dir_vec = this.direction.getVector();
    ph_arr.forEach((ph) => {
      var ph_coords = ph.getCoords();
      var to_ph = [ph_coords[0] - this.x, ph_coords[1] - this.y];
      var length = getLength(to_ph);

      if (length < this.pheromone_detection_distance) {
        if (dot(to_ph, dir_vec) > 0) {
          total_intensity += ph.getIntensity();
          point[0] += ph.getIntensity() * ph_coords[0];
          point[1] += ph.getIntensity() * ph_coords[1];
        }
      }
    });
    if (total_intensity) {
      point[0] /= total_intensity - this.x;
      point[1] /= total_intensity - this.y;
      console.log("Updating direction...");
      this.direction = new Direction(getAngle(point), 2);
    }
  }
}
