//const socket = io.connect('http://192.168.43.175:3000')
const socket = io.connect('http://localhost:3000')


// Five moving bodies
let arrayOfMover = [];
let arrayOfBall = [];
let arrayOfBubble = [];


var state = 0;  //
var fade;
var fadeAmount;
var r; //radius
var angle;
var angleCase5 = 45;
let jump = 40;

var numBalls = 200;
const numberOfBubble = 9
var gravity4;

//let frame = new Frame(10, 10);
let barre = new Barre(10, 10);
var xpos;
var ypos;

function setup() {
    createCanvas(640, 360);
    resetElementsInSketch({
        numberOfMover: 9,
        numberOfBalls: 0,
        numberOfBubbles: 0,
    });
    frameRate(60);

    gravity4 = createVector(-0.010, 0.150);

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


    console.log( "state: ", state )
    console.log( "arrayOfMover: ", arrayOfMover )
    console.log( "arrayOfBall: ", arrayOfBall )
    console.log( "arrayOfBubble: ", arrayOfBubble )

    switch (state) {

        case -1:
            break;

        case 0:

            barre.display0();

            for (let item of arrayOfMover) {

                let gravity = createVector(0, 0.1 * item.mass);
                item.applyForce(gravity);

                item.update0();
                item.display0();
                item.checkEdges();
                item.checkRectangleEdges0();
            }

            frame(15);

            break;

        case 1:
            barre.display1();

            for (let item of arrayOfMover) {
                item.update1();
                item.display1();
            }

            frame(30);

            break;

        case 2:
            barre.display2();

            for (let item of arrayOfBubble) {
                item.update();
                item.display();
                item.edges();
            }

            frame(45);

            break;

        case 3:
            frameRate(10);
            barre.display3();

            for (let i = 0; i < arrayOfBubble.length; i++) {
                arrayOfBubble[i].display3();
            }

            frame(60);

            break;

        case 4:
            frameRate(60);
            barre.display4();

            for (let item of arrayOfBall) {
                item.update();
                item.show();
                item.edges();
                item.applyForce(gravity4);
            }

            frame(75);

            break;

        case 5:
            frameRate(2);
            barre.display5();

            for (let bubble of arrayOfBubble) {
                bubble.display5()
            }

            frame(90);

            break;

        case 6:
            barre.display6();

            for (let item of arrayOfBubble) {
                frameRate(2);
                item.display6();
            }

            frame(105);

            break;

        case 7:
            frameRate(60);


            for (let item of arrayOfBubble) {
                //arrayOfBubble[i].update7();
                item.display7();
                item.edges7();
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
                    arrayOfBubble.push(newC);
                    count++;
                }
                attempts++;
                if (attempts > 100) {
                    noLoop();
                    console.log('finished');
                    break;
                }
            }

            for (let i = 0; i < arrayOfBubble.length; i++) {
                if (arrayOfBubble[i].growing) {
                    if (arrayOfBubble[i].edges()) {
                        arrayOfBubble[i].growing = false;
                    } else {
                        for (var j = 0; j < arrayOfBubble.length; j++) {
                            var other = arrayOfBubble[j];
                            if (arrayOfBubble[i] !== other) {
                                var d = dist(arrayOfBubble[i].x, arrayOfBubble[i].y, other.x, other.y);
                                var distance = arrayOfBubble[i].r8 + other.r8;

                                if (d - 2 < distance) {
                                    arrayOfBubble[i].growing = false;
                                    break;
                                }
                            }
                        }
                    }
                }

                arrayOfBubble[i].update8();
                arrayOfBubble[i].display8();
                arrayOfBubble[i].edges8();
            }

            barre.display8();
            frame(135);
            break;

        case 9:
            barre.display9();

            for (let item of arrayOfBubble) {
                item.update9();
                item.display9();
                item.edges9();
            }
            frame(150);
            break;
    }

    const dataArrayOfMovers = arrayOfMover.map(mover => {
        return {
            x: mover.position.x,
            y: mover.position.y,
            z: mover.position.z,
        }
    })

    const dataArrayOfBubbles = arrayOfBubble.map(bubble => {
        return {
            x: bubble.x,
            y: bubble.y,
            z: bubble.z,
        }
    })

    socket.emit("newSketchData", {
        arrayOfMovers: dataArrayOfMovers,
        arrayOfBubbles: dataArrayOfBubbles,
        /*balls : arrayOfBall,*/
    })

}

socket.on("stateUpdated", newState => {

    state = newState

    switch (state) {
        case 2 :
            resetElementsInSketch({
                numberOfMover: 0,
                numberOfBubbles: numberOfBubble,
            })
            break

        case 4 :
            resetElementsInSketch({
                numberOfBubbles: 0,
                numberOfBalls: numBalls,
            })
            break

        case 5 :
            resetElementsInSketch({
                numberOfBubbles: numberOfBubble,
                numberOfBalls: 0,
            })
            break
    }
})

new AreaDetections(() => {
    socket.emit( "stateChange", getNexState(state) )
    console.log("emit stateChange")
})

/**
 * @param numberOfMover     {number | undefined}
 * @param numberOfBubbles   {number | undefined}
 * @param numberOfBalls     {number | undefined}
 */
function resetElementsInSketch({
                                   numberOfMover,
                                   numberOfBubbles,
                                   numberOfBalls,
                               }) {

    if(numberOfMover !== undefined) {
        arrayOfMover = []
        for (let i = 0; i < numberOfMover; i++) {
            arrayOfMover[i] = new Mover(random(0.5, 3), 40 + i * 70, 0);
        }
    }

    if(numberOfBubbles !== undefined) {
        arrayOfBubble = []
        for(let i = 0; i < numberOfBubbles; i++) {
            arrayOfBubble[i] = new Bubble(0, 0)
        }
    }

    if(numberOfBalls !== undefined) {
        arrayOfBall = []
        for(let i = 0; i < numberOfBalls; i++) {
            arrayOfBall[i] = new Ball()
        }
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
