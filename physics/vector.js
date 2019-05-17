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
  newVec.x =  pointTo.x - pointFrom.x;
  newVec.y = pointTo.y - pointFrom.y;
  return newVec
}

module.exports = {
  NewVector,
  Vector,
};
