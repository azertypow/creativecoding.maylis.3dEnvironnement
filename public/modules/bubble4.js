function Ball() {
  let rebord = 50;
  this.r = random(10, 30);
  let loc = createVector(random(width -10), random(height - 10));
  let vel = createVector(random(1,8) , random(1,8));
  let acc = createVector(0, 0);
  let c1, c2, c3;

  this.show = function() {
    noStroke();
    fill(255);
    ellipse(loc.x, loc.y, this.r, this.r);
  }

  this.update = function() {
    loc.add(vel);
  }
	
  this.applyForce = function(forca) {
    acc.add(forca);
    vel.add(acc);
    acc.mult(0);
  }

  this.edges = function() {
    if (loc.x > width - rebord || loc.x < rebord) {
      vel.x *= -1;
      loc.x = rebord;
   }else if(loc.y > height - rebord || loc.y < rebord) {
     vel.y *= -1;
   }
  }
}