import React from "react";
import Sketch from "react-p5";
import "./App.css";
import { Grid } from "@material-ui/core";
import { AntSketch } from "./ant-colony/antSketch.js";

class testSketch {
  sketch = new AntSketch(1280, 640, 1280, 640);

  setup = (p5, parent) => {
    // Set up AntSketch
    this.sketch.setP5(p5, parent);
    this.sketch.setup();
  };

  preload = (p5) => {
    // Preload AntSketch
  };

  draw = (p5) => {
    // Draw AntSketch
    this.sketch.draw();
  };

  mouseClicked = (p5, event) => {
    var offset = this.sketch.getFoodSize();
    //this.sketch.addAnt(event.offsetX - offset, event.offsetY - offset);
    var x = event.offsetX - offset;
    var y = event.offsetY - offset;

    this.sketch.addFood(x, y);
    return false;
  };
}

function App() {
  var mySketch = new testSketch();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Sketch
          preload={mySketch.preload}
          setup={mySketch.setup}
          draw={mySketch.draw}
          mouseClicked={mySketch.mouseClicked}
        />
      </Grid>
    </Grid>
  );
}

export default App;
