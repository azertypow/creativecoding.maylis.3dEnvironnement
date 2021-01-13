function Ball() {
  let rebord = 50;
  this.r = random(10, 30);
  this.position = createVector(random(width -10), random(height - 10));
  let vel = createVector(random(1,8) , random(1,8));
  let acc = createVector(0, 0);
  let c1, c2, c3;

  this.show = function() {
    noStroke();
    fill(135);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  this.update = function() {
    this.position.add(vel);
  }
	
  this.applyForce = function(forca) {
    acc.add(forca);
    vel.add(acc);
    acc.mult(0);
  }

  this.edges = function() {
    if (this.position.x > width - rebord || this.position.x < rebord) {
      vel.x *= -1;
      this.position.x = rebord;
   }else if(this.position.y > height - rebord || this.position.y < rebord) {
     vel.y *= -1;
   }
  }
}