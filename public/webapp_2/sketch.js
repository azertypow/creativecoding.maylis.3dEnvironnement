const socket = io.connect('http://localhost:3000')

let data = {
    arrayOfMovers:[],
    arrayOfBubbles: [],
}

function setup() {
    createCanvas(400, 400)
}

function draw() {
    background(0, 0, 255)

    for(const mover of data.arrayOfMovers) {
        ellipse(mover.y, mover.z, 10, 10)
    }
}

socket.on('sketchDataUpdated', (dataFromServer) => {
    data = dataFromServer
})
