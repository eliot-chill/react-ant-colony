import { dot } from "./util.js";

export class Direction {
  rot_speed;
  m_target_vector = [0, 0];
  m_vector = [0, 0];
  m_target_angle;
  m_angle;

  constructor(angle, rot_speed) {
    this.m_angle = angle;
    this.m_target_angle = angle;

    this.rot_speed = rot_speed;

    this.updateVector();
    this.m_target_vector = this.m_vector;
  }

  update(dt) {
    this.updateVector();
    var dirVec = [-this.m_vector[1], this.m_vector[0]];
    var dirDelta = dot(this.m_target_vector, dirVec);
    // console.log(
    //   "Target vector and dir vector",
    //   this.m_target_vector[0],
    //   this.m_target_vector[1],
    //   dirVec[0],
    //   dirVec[1]
    // );
    this.m_angle += this.rot_speed * dirDelta * dt;
  }

  getVector() {
    return this.m_vector;
  }

  addVector(a) {
    this.m_target_angle += a;
    this.updateTargetVector();
  }

  addVectorNow(a) {
    this.addVector(a);
    this.m_angle = this.m_target_angle;
    this.updateVector();
  }

  equals(a) {
    this.m_target_angle = a;
    this.updateTargetVector();
  }

  updateVector() {
    this.m_vector[0] = Math.cos(this.m_angle); // X
    this.m_vector[1] = Math.sin(this.m_angle); // Y
  }

  updateTargetVector() {
    this.m_target_vector[0] = Math.cos(this.m_target_angle);
    this.m_target_vector[1] = Math.sin(this.m_target_angle);
  }
}
