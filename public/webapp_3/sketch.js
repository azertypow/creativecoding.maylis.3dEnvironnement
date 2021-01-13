//const socket = io.connect('http://192.168.43.175:3000')
const socket = io.connect('http://localhost:3000')

let data = {
    arrayOfMovers:[],
    arrayOfBubbles: [],
    arrayOfBalls: [],
},
    state = 0

function setup() {
    createCanvas(640, 360);
}

function draw() {
    background(0, 0, 255)

    for(const mover of data.arrayOfMovers) {
        ellipse(width - mover.z, mover.y, 10, 10)
    }

    for(const bubble of data.arrayOfBubbles) {
        ellipse(width - bubble.z, bubble.y, 20, 20)
    }

    for(const ball of data.arrayOfBalls) {
        ellipse(width - ball.z, ball.y, 30, 30)
    }
}

new AreaDetections(() => {
    socket.emit( "stateChange", getNexState(state) )
    console.log("emit stateChange")
})

socket.on('sketchDataUpdated', (dataFromServer) => {
    data = dataFromServer
})

socket.on("stateUpdated", newState => {
    state = newState
    console.log(newState)
})
