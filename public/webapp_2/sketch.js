//const socket = io.connect('http://192.168.43.175:3000')
const socket = io.connect('http://localhost:3000')

let data = {
    arrayOfMovers:[],
    arrayOfBubbles: [],
},
    state = 0

function setup() {
    createCanvas(640, 360);
}

function draw() {
    background(0, 0, 255)

    for(const mover of data.arrayOfMovers) {
        ellipse(mover.y, mover.z, 10, 10)
    }
}

function keyPressed() {
    socket.emit( "stateChange", getNexState(state) )
    console.log("emit stateChange")
}

socket.on('sketchDataUpdated', (dataFromServer) => {
    data = dataFromServer
})

socket.on("stateUpdated", newState => {
    state = newState
    console.log(newState)
})
