class Mover {
  /**
   * @typedef {"front"|"right"|"back"|"left"|"bottom"|"top"} ViewPosition
   */

  /**
   * @type {ViewPosition}
   */
  viewPosition

  /** @type {Vector} */
  pos = createVector(0, 0, 0)
  /** @type {Vector} */
  vel = createVector(0, 0, 0)
  /** @type {Vector} */
  acc = createVector(0, 0, 0)
  r = 16

  // spaceLimits
  minX = this.r
  maxX = 400 - this.r

  minY = this.r
  maxY = 400 - this.r

  minZ = this.r
  maxZ = 400 - this.r

  /**
   * @param {ViewPosition} viewPosition
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(viewPosition, x = 0, y = 0, z = 0) {
    if(typeof viewPosition !== "string") console.error("first argument must be type of ViewPosition")
    this.viewPosition = viewPosition
    this.pos = createVector(x, y, z)
  }

  applyForce(force) {
    this.acc.add(force);
  }


  edges() {
    if (this.pos.x >= this.maxX) {

      this.pos.x = this.maxX;
      this.vel.x *= -1;

    } else if (this.pos.x <= this.minX ) {

      this.pos.x = this.minX;
      this.vel.x *= -1;

    }

    if ( this.pos.y >= this.maxY ) {

      this.pos.y = this.maxY;
      this.vel.y *= -1;

    } else if ( this.pos.y <= this.minY ) {

      this.pos.y = this.minY
      this.vel.y *= -1

    }

    if ( this.pos.z >= this.maxZ ) {

      this.pos.z = this.maxZ;
      this.vel.z *= -1;

    } else if ( this.pos.z <= this.minZ ) {

      this.pos.z = this.minZ;
      this.vel.z *= -1;

    }


  }


  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0, 0);
  }

  show() {
    noStroke();
    fill(255);

    switch ( this.viewPosition) {
      case "front":
        ellipse(this.pos.x, this.pos.y, this.depthEmulation)
        break

      case "right":
        break

      case "back":
        break

      case "left":
        break

      case "bottom":
        break

      case "top":
        ellipse(this.pos.x, this.pos.z, this.depthEmulation)
        break
    }
  }

  get depthEmulation() {

    let factor = 1

    switch ( this.viewPosition) {
      case "front":
        factor = this.pos.z / this.maxZ
        break

      case "right":
        break

      case "back":
        break

      case "left":
        break

      case "bottom":
        break

      case "top":
        factor = 1 - this.pos.y / this.maxY
        break
    }

    return this.r * 2 * factor
  }
}
