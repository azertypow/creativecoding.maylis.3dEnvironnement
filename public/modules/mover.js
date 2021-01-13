function Mover(m, x, y, z = 1) {
  /*this.x = x;
  this.y = y;
  this.z = 1;*/
  this.mass = m;
  this.position = createVector(x, y, z);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.angle = 0;
  this.r = 100;


  // Newton's 2nd law: F = M * A
  // or A = F / M
  this.applyForce = function(force) {
    let newAcceleration = p5.Vector.div(force, this.mass);
    this.acceleration.add(newAcceleration);
  };

  this.update0 = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  };

  this.randomOrder = function() {
    this.position.x = random(-width / 2, width / 2);
    this.position.y = random(-height / 2, height / 2);
    this.mass = random(20, 60);
  }

  this.randomOrder2 = function() {
    this.position.x = random(width);
    this.position.y = random(height);
    this.mass = random(1, 60);
  }


  this.update1 = function() {
    this.angle = this.angle + 0.1;
  }

  this.update2 = function() {
    this.velocity.y *= -0.5;
    this.position.x -= 1;
  }

  this.display0 = function() {
    noStroke();
    fill(255, fade);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  };

  this.display1 = function() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    noStroke();
    fill(255, fade);
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
    pop();
  };

  this.display2 = function() {
    noStroke();
    fill(255, fade);
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
  };


  this.checkEdges = function() {
    if (this.position.y > (height - this.mass * 8)) {
      this.velocity.y *= -0.9;
      this.position.y = (height - this.mass * 8);
    }
  };

  this.checkRectangleEdges0 = function() {
    if (this.position.y > 155 && this.position.x > width / 4 && this.position.x < 360) {
      this.velocity.y *= -0.5;
      this.position.y = (155 - this.mass * 4);
    }
  };

  this.checkRectangleEdges2 = function() {
    if (this.position.y > height - 100 || this.position.y < 100 || this.position.x > width - 100 || this.position.x < 100) {
      this.position.x = width - this.diameter / 2;

    }
  };

}
