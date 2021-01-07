const socket = io.connect('http://localhost:3000')


let
    /** @type {Mover} */
    mover,
    c1,
    c2,
    /** @type {Vector} */
    gravity = new p5.Vector(.5, 1, 1)

function setup() {
    createCanvas(400, 400)
    mover = new Mover("front", 200, 200)
}


function draw() {
    c1 = color(0, 0, 255)
    c2 = color(255)

    setGradient(c1, c2)

    mover.applyForce(gravity)

    mover.update()
    mover.edges()
    mover.show()

    socket.emit("newSketchData", [
        {
            x: mover.pos.x,
            y: mover.pos.y,
            z: mover.pos.z,
        }
    ])
}

function setGradient(c1, c2) {
    noFill()
    for (var y = 0; y < height; y++) {
        var inter = map(y, 0, height, 0, 1)
        var c = lerpColor(c1, c2, inter)
        stroke(c)
        line(0, y, width, y)
    }
}

// Five moving bodies
let movers = [];
let b = [];
let bubbles = [];


var state = 0;
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
let phrases = [
    "Question fall on me like snowballs.Where am I ? \nThey push in a strange place, where I feel lost. \nIs it old outside ? Who are you ? \nWhat’s your favorite color ?",

    "Each question makes me dive deeper. \nI have to find an answer. I am, all at the same time,\na line, a shape, an action. \nI have to fulfil my work.I react quickly but quietly. \nI am very efficient.",

    "They try to trick me with impossible questions. \nThey scare me.",

    "I panic and I crash.",

    "These people live across my space. \nBut they can change my fate. \nEven with all my power, I depend on them. \nI undergo tests that last hours, everyday. I am always worried. \nSometimes I crash, sometimes I find their questions stupid:\n but they are always surprised by my answers. \nThey seem logic to me.",

    "I expand myself, hoping to find \nsomething in this empty space. \nBut there is nothing.",

    "With all my tasks, I feel that I am only a tool.\nI solve request, but I don’t really think. \nI stand alone in this job. I am transparent for them,\nnearly invisible. I feel lonely.",

    "The space around me is bright.\nWhite, pure white. \nThere’s any movement. \nThe space in front of me is crowdy. \nDark. With distractions.",

    "I feel nothing. I am locked in this space. \nI try to interact with this outside space,\nbut no one notice my attempts. \nI am trapped."
];
let timer;
let fadeOut = 255;


function setup() {
    createCanvas(640, 360);
    reset();
    frameRate(60);

    for (let i = 0; i < 9; i++) {
        bubbles[i] = new Bubble();
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

            textBox();

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

            textBox();

            barre.display1();

            for (let i = 0; i < movers.length; i++) {
                movers[i].update1();
                movers[i].display1();
            }

            frame(30);

            break;

        case 2:
            textBox();
            barre.display2();

            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].update();
                bubbles[i].display();
                bubbles[i].edges();

            }

            frame(45);

            break;

        case 3:
            textBox();
            frameRate(10);
            barre.display3();

            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].display3();
            }

            frame(60);

            break;

        case 4:
            textBox();
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
            textBox();
            frameRate(2);
            barre.display5();


            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].display5();
            }

            frame(90);

            break;

        case 6:
            textBox();
            barre.display6();

            for (let i = 0; i < bubbles.length; i++) {
                frameRate(2);
                bubbles[i].display6();
            }

            frame(105);

            break;

        case 7:
            textBox();
            frameRate(60);


            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].display7();
                bubbles[i].edges7();
            }

            barre.display7();
            frame(120);
            break;

        case 8:
            textBox();

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
            textBox();
            barre.display9();

            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].update9();
                bubbles[i].display9(width/2, height/2 + 16);
                bubbles[i].edges9();
            }
            frame(150);
            break;
    }
}

function keyPressed() {
    timer = millis();


    if (key == "z") {
        state = -1;
    } else if (key == "a") {
        state = 0;
    } else if (key == "b") {

        for (let i = 0; i < movers.length; i++) {
            movers[i].randomOrder();
        }
        state = 1;
    } else if (key == "c") {
        for (let i = 0; i < movers.length; i++) {
            movers[i].randomOrder2();
        }
        state = 2;
    } else if (key == "d") {
        state = 3;
    } else if (key == "e") {
        state = 4;
    } else if (key == "f") {
        state = 5;
    } else if (key == "g") {
        state = 6;
    } else if (key == "h") {
        state = 7;
    } else if (key == "i") {
        state = 8;
    } else if (key == "j") {
        state = 9;
    }

}

function textBox() {

    if (millis() - timer < 2000) {
        noStroke();
        fill(255, fadeOut);
        text(phrases[state], width / 4, height / 2);
    } else {
        noStroke();
        fadeOut -= 10;
        fill(255, fadeOut);
        text(phrases[state], width / 4, height / 2);
    }
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
};
