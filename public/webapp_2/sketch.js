const socket = io.connect('http://localhost:3000')


let
    /** @type {Mover} */
    mover

function setup() {
    createCanvas(400, 400)
    mover = new Mover("top", 200, 200)
}

function draw() {
    background(0, 0, 255)

    mover.show()
}

socket.on('sketchDataUpdated', (data) => {
    mover.pos.x = data[0].x
    mover.pos.y = data[0].y
    mover.pos.z = data[0].z
})
