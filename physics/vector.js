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
    return new Vector(this.x, this.y);
  }

  normalize() {
    const len = this.length();
    if (len > 0) {
      this.scale(100 / len)
    }
    return this;
  }

  setLength(length)  {
    this.scale(length / this.length());
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

  // Angle returns the angle of the vector with the X axis
  angle() {
    return Math.atan2(this.y, this.x)
  }

  angleDegrees() {

    return this.angle() * 180 / Math.PI
  }

  oppositeAngle() {
    return Math.acos(this.cos())
  }

  addAngleDegree(degree) {
    let newAngle = this.angleDegrees() + degree;
    newAngle *= Math.PI / 180;

    const length = this.length();
    this.x = length * Math.cos(newAngle);
    this.y = length * Math.sin(newAngle);
    return this
  }

  IsEqualTo(b) {
    return b.y === this.y && b.x === this.x;
  }

  /**
   * Returns the angle of B from A.
   *
   * Assuming that A is the axis X of the plan, the angle returned is the diff of the angle of B.
   *
   * example:
   * A: 30 degrees
   * B: 45 degrees
   * Returns: 15 degrees
   *
   * @param {Vector} b
   * @return {number}
   */
  angleWith(b) {
    const myAngle = this.angleDegrees();
    let copyB = b.copy();
    copyB.addAngleDegree(-myAngle);
    return copyB.angleDegrees();
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
