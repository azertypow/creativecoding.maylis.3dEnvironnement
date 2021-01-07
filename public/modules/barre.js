function Barre() {
  this.x = 0;
  this.y = 0;

  this.y1 = 30;
  this.x6 = 300;
  //comment rendre les mesures proportielles au canvas ? En sachant que height et width ne sont pas connues du constructor
  this.ydirection = 1;
  this.xdirection = 20;


  this.display0 = function() {
    noStroke();
    fill(255);
    rect(width / 4, height / 2, 200, 10);
  };

  this.display1 = function() {
    this.y1 += this.ydirection;

    if (this.y1 >= 0.37 * height || this.y1 < 30) {
      this.ydirection = -this.ydirection;
    }

    noStroke();
    fill(255);
    rect(100, this.y1, 10, 200);
  };


  this.display2 = function() {
    noStroke();
    fill(255);
    rect(100, height / 2 - 100, 10, 200);
    rect(width - 100, height / 2 - 100, 10, 200);
    rect(width / 2 - 105, height / 2 - 100, 210, 10);
    rect(width / 2 - 105, height - 90, 210, 10);
  };


  this.display3 = function() {
    noStroke();
    fill(255);
    rect(40, height - 50, 250, 10);
    rect(width - 290, height - 50, 250, 10);
  };

  this.display4 = function() {
    let ecart = 5;
    this.x = width - 350;
    this.y = height / 2;
    this.sizeX = 300;
    this.sizeY = 10;

    noStroke();
    fill(255);

    for (let j = 0; j < 5; j++) {
      rect(this.x, this.y, this.sizeX, this.sizeY);
      this.sizeY += ecart;
      this.y += ecart + this.sizeY;
      this.x += -ecart * 12.45;
    }
  };

  this.display5 = function() {
    let ecart = 17;
    this.x = width - 350;
    this.y = 230;
    this.sizeX = 300;
    this.sizeY = 10;

    noStroke();
    fill(255);

    for (let j = 0; j < 5; j++) {
      rect(this.x, this.y, this.sizeX, this.sizeY);
      this.y += ecart;
    }
  };

  this.display6 = function() {
    this.x6 += this.xdirection;

    if (this.x6 >= 500 || this.x6 < 120) {
      this.xdirection = -this.xdirection;
    }

    noStroke();
    fill(255);
    rect(this.x6, height / 2, 20, 10);
  }

  this.display7 = function() {
    let ecart = 20;
    this.x = width / 2 - 20;
    this.y = height / 2 - 20;

    noStroke();
    fill(255);

    for (let j = 0; j < 3; j++) {
      rect(this.x, this.y, 20 + ecart, 10);
      this.y += ecart;
    }
  };

  this.display8 = function() {
    stroke(255);
    strokeWeight(4);
    noFill();
    rect(70, 70, width - 139, height - 139);
  };

  this.display9 = function() {
    stroke(255);
    strokeWeight(4);
    noFill();
    rect(80, 80, width - 160, height - 160);
    rect(80, 80, width - 160, height - 330);
  };

}