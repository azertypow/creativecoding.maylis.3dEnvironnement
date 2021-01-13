//const socket = io.connect('http://192.168.43.175:3000')
const socket = io.connect('http://localhost:3000')


// Five moving bodies
let movers = [];
let b = [];
let bubbles = [];


var state = 0;  //
var fade;
var fadeAmount;
var r; //radius
var angle;
var angleCase5 = 45;
let jump = 40;

var numBalls = 200;
var gravity4;

//let frame = new Frame(10, 10);
let barre = new Barre(10, 10);
var xpos;
var ypos;

function setup() {
    createCanvas(640, 360);
    reset();
    frameRate(60);

    for (let i = 0; i < 9; i++) {
        bubbles[i] = new Bubble(0, 0);
    }

    gravity4 = createVector(-0.010, 0.150);

    for (var i = 0; i < numBalls; i++) {
        b[i] = new Ball();
    }

    colorA = color(253);
    colorB = color(226);
    fade = 255;
    r = 1;
    angle = 0;

    //textFont('Avenir');
    //textAlign(CENTER, CENTER);
    textSize(15);

}

function draw() {
    //background(127);
    c1 = color(255);
    c2 = color(100);
    setGradient(c1, c2);


    switch (state) {

        case -1:
            break;

        case 0:

            barre.display0();

            for (let i = 0; i < movers.length; i++) {

                let gravity = createVector(0, 0.1 * movers[i].mass);
                movers[i].applyForce(gravity);

                movers[i].update0();
                movers[i].display0();
                movers[i].checkEdges();
                movers[i].checkRectangleEdges0();
            }

            frame(15);

            break;

        case 1:

            barre.display1();

            for (let i = 0; i < movers.length; i++) {
                movers[i].update1();
                movers[i].display1();
            }

            frame(30);

            break;

        case 2:
            barre.display2();

            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].update();
                bubbles[i].display();
                bubbles[i].edges();

            }

            frame(45);

            break;

        case 3:
            frameRate(10);
            barre.display3();

            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].display3();
            }

            frame(60);

            break;

        case 4:
            frameRate(60);
            barre.display4();

            for (let i = 0; i < b.length; i++) {
                b[i].update();
                b[i].show();
                b[i].edges();
                b[i].applyForce(gravity4);
            }

            frame(75);

            break;

        case 5:
            frameRate(2);
            barre.display5();


            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].display5();
            }

            frame(90);

            break;

        case 6:
            barre.display6();

            for (let i = 0; i < bubbles.length; i++) {
                frameRate(2);
                bubbles[i].display6();
            }

            frame(105);

            break;

        case 7:
            frameRate(60);


            for (let i = 0; i < bubbles.length; i++) {
                //bubbles[i].update7();
                bubbles[i].display7();
                bubbles[i].edges7();
            }

            barre.display7();
           frame(120);
            break;

        case 8:
            var total = 5;
            var count = 0;
            var attempts = 0;

            while (count < total) {
                var newC = newCircle();
                if (newC !== null) {
                    bubbles.push(newC);
                    count++;
                }
                attempts++;
                if (attempts > 100) {
                    noLoop();
                    console.log('finished');
                    break;
                }
            }

            for (let i = 0; i < bubbles.length; i++) {
                if (bubbles[i].growing) {
                    if (bubbles[i].edges()) {
                        bubbles[i].growing = false;
                    } else {
                        for (var j = 0; j < bubbles.length; j++) {
                            var other = bubbles[j];
                            if (bubbles[i] !== other) {
                                var d = dist(bubbles[i].x, bubbles[i].y, other.x, other.y);
                                var distance = bubbles[i].r8 + other.r8;

                                if (d - 2 < distance) {
                                    bubbles[i].growing = false;
                                    break;
                                }
                            }
                        }
                    }
                }

                bubbles[i].update8();
                bubbles[i].display8();
                bubbles[i].edges8();
            }

            barre.display8();
            frame(135);
            break;

        case 9:
            barre.display9();

            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].update9();
                bubbles[i].display9();
                bubbles[i].edges9();
            }
            frame(150);
            break;
    }

    const arrayOfMovers = movers.map( mover => {
        return {
            x: mover.position.x,
            y: mover.position.y,
            z: mover.position.z,
        }
    })

    const arrayOfBubbles = bubbles.map( bubble => {
        return {
            x: bubble.x,
            y: bubble.y,
            z: bubble.z,
        }
    })

    socket.emit("newSketchData", {
        arrayOfMovers,
        arrayOfBubbles,
        /*balls : b,*/
    })

}

socket.on("stateUpdated", newState => {
    state = newState
})

function keyPressed() {
    socket.emit( "stateChange", getNexState(state) )
    console.log("emit stateChange")
}

function reset() {
    for (let i = 0; i < 9; i++) {
        movers[i] = new Mover(random(0.5, 3), 40 + i * 70, 0);
    }
}


function setGradient(c1, c2) {
    noFill();

    for (var y = 0; y < height; y++) {
        var inter = map(y, 0, height, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, y, width, y);
    }
}

function frame(strokeW) {
    noFill();
    stroke(0, 0, 255);
    strokeWeight(strokeW);
    rect(0, 0, width, height);
}
