import { Food } from "./food.js";
import { States } from "./pheromone.js";

export class World {
  /* Graphics buffer */
  pg;

  w; // Typically same width as window
  h; // ^^ for height
  ph_grid = []; // grid for pheromones
  food_grid = []; // grid for food
  home_grid = []; // grid for home

  food_size = 16;
  ph_size = 4;

  constructor(pg, w, h) {
    this.pg = pg;

    this.w = w;
    this.h = h;
  }

  addPheromone(pheromone) {
    this.ph_grid.push(pheromone);
  }

  addFood(food) {
    this.food_grid.push(food);
  }

  getFoods(x, y) {
    var matchedFood = [];
    this.food_grid.forEach((food) => {
      if (food.getCoords() == (x, y)) matchedFood.push(food);
    });
    return matchedFood;
  }

  spawnFood(x, y) {
    console.log("Adding food @ ", x, y);
    var tmpFood = new Food(this.pg, x, y);
    this.addFood(tmpFood);
  }

  getPheromones(x, y, s) {
    var matchedPh = [];
    this.ph_grid.forEach((ph) => {
      var coords = ph.getCoords();
      if (coords[0] - x < s && coords[1] - y < s) matchedPh.push(ph);
    });
    return matchedPh;
  }

  drawFood() {
    this.food_grid.forEach((food) => {
      food.draw(this.food_size);
    });
  }

  drawPheromones() {
    this.ph_grid.forEach((ph) => {
      ph.draw(this.ph_size);
    });
  }

  removedExpiredPheromones() {
    var filtered = this.ph_grid.filter((ph) => !ph.isDone());
    this.ph_grid = filtered;
  }

  updatePheromones(dt) {
    this.removedExpiredPheromones();
    this.ph_grid.forEach((ph) => {
      ph.update(dt);
    });
  }

  getGrid(state) {
    if (state == States.TO_FOOD) {
      return this.food_grid;
    } else if (state == States.TO_HOME) {
      return this.home_grid;
    }
  }
}
