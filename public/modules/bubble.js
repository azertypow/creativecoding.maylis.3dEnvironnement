function Bubble(x,y) {
  this.x = x;
  this.y = y;
  this.z = 1;
  this.r = random(10, 60);
  this.r9 = 1.2;
  this.r8 = 3;
  this.xspeed = 2;
  this.yspeed = 2;
  this.angle = 0;
  this.growing = true;

  let binaire;
  let intervalle;
  let angle = 10;
  let binaireArray = [0, 255];
  let j;
  let binaireColor;
  let move = 6;

  let x1 = width / 2;
  let y1 = height / 2;

  let x2 = width / 2;
  let y2 = height / 2;

  let x3 = width / 2;
  let y3 = height / 2;

  let x4 = width / 2;
  let y4 = height / 2;

  this.display = function() {
    noStroke();
    fill(195);
    ellipse(this.x, this.y, this.r, this.r);
  }

  this.display3 = function() {
    let jump = 80;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        noStroke();
        fill(165, random(5, 200));
        this.x = column * (jump + 100) + 140;
        this.y = row * jump + 95;
        ellipse(this.x , this.y, this.r, this.r);
      }
    }
  }

  this.display5 = function() {
    let jump = 50;

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 11; column++) {
        noStroke();
        fill(random(255));
        this.x = column * (jump - 6) + 100;
        this.y = row * jump + 95;
        ellipse(this.x, this.y, 30, 30);
      }
    }
  }


  this.display6 = function() {
    let jump = 60;
    for (let column = 0; column < 5; column++) {
      j = Math.floor(random(binaireArray.length));
      binaireColor = binaireArray[j];
      noStroke();
      fill(binaireColor);
      this.y = column * jump + 95;
      this.x = width/2;
      ellipse(this.x, this.y, 45, 45);
    }
  }

  this.display7 = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    noStroke();
    fill(200);
    ellipse(this.x, this.y, 40, 40);
  }

  this.display8 = function() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.r8 * 2, this.r8 * 2);
  }

  this.display9 = function() {
    noStroke();
    fill(255);
    this.x = width/2;
    this.y = height/2 + 16;
    ellipse(this.x,this.y, this.r9, this.r9);
  }

  this.update = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  this.update8 = function() {
    if (this.growing) {
      this.r8 += 1;
    }
  }

  this.update9 = function() {
    this.r9 += move;
  }

  this.edges = function() {
    if (this.y > height - 116 || this.y < 116 || this.x < 116 || this.x > width - 116) {
      this.xspeed = -this.xspeed;
      this.yspeed = -this.yspeed;
    }
  }

  this.edges7 = function() {
    if (this.x >= width || this.y >= height || this.x < -1 || this.x < -1) {
      this.xspeed = - this.xspeed;
      this.yspeed = - this.yspeed;
    }
  }

  this.edges8 = function() {
    return (
      this.x + this.r8 >= width - 135 ||
      this.x - this.r8 <= 135 ||
      this.y + this.r8 >= height - 135 ||
      this.y - this.r8 <= 135
    );
  }

  this.edges9 = function() {
    if (this.r9 > 170 || this.r9 < 0) {
      move *= -1;
    } else if (this.r9 < 1 && this.r9 > 0) {
      move *= 1;
      this.r9 += move;
    }
  }

  this.randomOrder2 = function() {
    this.x = random(200, 400);
    this.y = random(110,200);
  }

  this.randomOrder3 = function() {
    this.x = random(640);
    this.y = random(360);
  }

}

function newCircle() {
  var x = random(width);
  var y = random(height);
  var valid = true;

  for (var i = 0; i < arrayOfBubble.length; i++) {  // todo: //!\\ ne jamais jamais faire ceci! (référence trop loin!)
    var d = dist(x, y, arrayOfBubble[i].x, arrayOfBubble[i].y);
    if (d < arrayOfBubble[i].r8) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Bubble();
  } else {
    return null;
  }
}
