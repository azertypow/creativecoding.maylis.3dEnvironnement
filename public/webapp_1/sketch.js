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
