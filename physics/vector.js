const Point = require('./point').Point;

class Vector {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @returns {boolean}
   */
  isValid() {
    return (Vector.validateCoord(this.x) && Vector.validateCoord(this.y))
      &&
      (this.x !== 0 || this.y !== 0)
  }

  static validateCoord(coord) {
    return typeof coord === "number" && isFinite(coord)
  }

  invert() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  length() {
    return Math.hypot(this.x, this.y)
  }


  add(vectorB) {
    this.x = this.x + vectorB.x;
    this.y = this.y + vectorB.y;
    return this;
  }

  sub(vectorB) {
    this.x = this.x - vectorB.x;
    this.y = this.y - vectorB.y;
    return this;
  }

  targetFrom(pointOrigin) {
    return new Point(
      pointOrigin.x + Math.round(this.x),
      pointOrigin.y + Math.round(this.y)
    );
  }

  /**
   * Returns a vector perpendicular to this one
   * @return {Vector}
   */
  perpendicular(toRight = true) {
    return toRight ? new Vector(this.y, -this.x) : new Vector(-this.y, this.x);
  }

  copy() {
    return new Vector(this.x ,this.y);
  }

  normalize() {
    const len = this.length();
    if (len > 0 ) {
      this.scale(100 / len)
    }
    return this;
  }

  scale(size) {
    this.x *= size;
    this.y *= size;
    return this;
  }

  sin() {
    return this.y / this.length()
  }

  cos() {
    return this.x / this.length()
  }

  toString() {
    return JSON.stringify(this);
  }
}

/**
 *
 * @param {Point} pointFrom
 * @param {Point} pointTo
 * @return {Vector}
 */
function NewVector(pointFrom, pointTo) {
  let newVec = new Vector();
  newVec.x = pointTo.x - pointFrom.x;
  newVec.y = pointTo.y - pointFrom.y;
  return newVec
}

/* it does not avoid the value be overwritten !! */
const North = new Vector(0, 1);
const South = new Vector(0, -1);
const West = new Vector(-1, 0);
const East = new Vector(1, 0);


module.exports = {
  NewVector,
  Vector,
  NORTH: North,
  SOUTH: South,
  WEST: West,
  EAST: East,
};
