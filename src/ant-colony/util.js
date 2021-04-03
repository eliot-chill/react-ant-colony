export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function dot(v1, v2) {
  /* 0 -> x, 1 -> y */
  return v1[0] * v2[0] + v1[1] * v2[1];
}

export function getLength(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

export function getAngle(v) {
  var a = Math.acos(v[0] / getLength(v));
  return v[1] > 0 ? a : -a;
}
