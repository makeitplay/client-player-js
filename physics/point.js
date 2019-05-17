class Point {
  /**
   * @type {number}
   */
  x;
  /**
   * @type {number}
   */
  y;

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  /**
   *
   * @param {Point} target
   * @returns {*}
   */
  distanceTo(target) {
    const catA = target.x - this.x;
    const catO = target.y - this.y;
    return Math.hypot(catA, catO)
  }


  /**
   *
   * @param  {Point} target
   * @returns {Point}
   */
  middlePointTo(target) {
    const x = Math.abs(this.x - target.x)/2;
    const y = Math.abs(this.y - target.y)/2;

    return new Point(
      Math.round(Math.min(this.x, target.x) + x),
      Math.round(Math.min(this.y, target.y) + y)
    );
  }
}


module.exports = {
  Point,
};