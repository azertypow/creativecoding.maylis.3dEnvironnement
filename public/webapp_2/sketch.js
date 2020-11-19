var socket;
socket = io.connect('http://localhost:3000');

let mover;

function setup() {
    createCanvas(400, 400);
    mover = new Mover(200, 200);

    console.log("hello canvas");
    console.log(socket);

}


function draw() {
    c1 = color(0, 0, 255);
    c2 = color(255);
    setGradient(c1, c2);

    function setGradient(c1, c2) {
        noFill();
        for (var y = 0; y < height; y++) {
            var inter = map(y, 0, height, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, y, width, y);
        }
    }

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        mover.applyForce(wind);
    }

    let gravity = createVector(0, random(0.7));
    mover.applyForce(gravity);

    mover.update();
    mover.edges();
    mover.show();
}