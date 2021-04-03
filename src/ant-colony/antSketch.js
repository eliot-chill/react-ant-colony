// Main P5 Sketch place
// World management events occur here
import { World } from "./world.js";
import { Colony } from "./colony.js";
import antImg from "./res/ant.png";

export class AntSketch {
  /* P5 instance */
  p5;
  parent;

  world_w;
  world_h;
  port_w;
  port_h;
  cursor_x;
  cursor_y;
  zoom = 1;

  /* Graphics stuff */
  canvas;
  worldGraphic;
  dt;

  /* Object stuff */
  world;
  colony;

  constructor(world_w, world_h, port_w, port_h) {
    this.world_w = world_w;
    this.world_h = world_h;
    this.port_w = port_w;
    this.port_h = port_h;

    this.dt = 0.016;

    /* Set initial cursor coords */
    this.cursor_x = world_w > 0 ? Math.floor(world_w / 2) : 0;
    this.cursor_y = world_h > 0 ? Math.floor(world_h / 2) : 0;
  }

  setP5(p5, parent) {
    this.p5 = p5;
    this.parent = parent;
  }

  preload() {
    this.p5.loadImage(antImg, (img) => {
      this.img = img;
    });
  }

  setup() {
    // Create canvas
    this.canvas = this.p5
      .createCanvas(this.port_w, this.port_h)
      .parent(this.parent);
    this.worldGraphic = this.p5
      .createGraphics(this.world_w, this.world_h)
      .parent(this.parent);

    // Create world
    this.world = new World(this.worldGraphic, this.world_w, this.world_h);
    this.colony = new Colony(this.worldGraphic, 10);

    // Spawn some ants
    //this.colony.spawnAnt(0, 0);
    this.colony.spawnMaxAnts(this.world_w, this.world_h);
  }

  draw() {
    this.colony.drawAnts();
    this.world.drawFood();
    this.world.drawPheromones();
    this.p5.image(this.worldGraphic, 0, 0, this.port_w, this.port_h);
    this.worldGraphic.background(127);

    /* Framerate */
    //console.log(this.p5.frameRate());

    this.update();
  }

  update() {
    this.world.updatePheromones(this.dt);
    this.colony.update(this.dt, this.world);
  }

  addAnt(x, y) {
    //this.colony.spawnAnt(x, y);
  }

  addFood(x, y) {
    this.world.spawnFood(x, y);
  }

  getAntSize() {
    return this.colony.ant_size;
  }

  getFoodSize() {
    return this.world.food_size;
  }
}
