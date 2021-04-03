import React from "react";
import Sketch from "react-p5";
import "./App.css";
import { Ant } from "./ant-colony/ant.js";
import antImg from "./ant-colony/res/ant.png";

class testSketch {
  x = 50;
  y = 50;
  c = 32;
  ant;
  img;

  setup = (p5, parent) => {
    p5.createCanvas(500, 500).parent(parent);
    this.ant = new Ant(this.x, this.y, p5);
  };

  preload = (p5) => {
    p5.loadImage(antImg, (img) => {
      this.img = img;
    });
  };

  draw = (p5) => {
    p5.background(255);
    this.ant.draw(this.img);
    this.ant.update(this.x, this.y);
    if (this.x++ >= 500 + this.c / 2) this.x = -this.c / 2;
  };
}

function App() {
  var mySketch = new testSketch();
  return (
    <Sketch
      setup={mySketch.setup}
      draw={mySketch.draw}
      preload={mySketch.preload}
    />
  );
}

export default App;
