import express from "express"
import {Server} from "socket.io"
import {AnAnotherClass, ExternalClass, simpleFunction} from "./sampleModules.js"
import {SketchApp} from "./SketchApp.js"

// simple class and function from other files importation
const externalClass 					= new ExternalClass()
const anAnotherClass_withoutParameter 	= new AnAnotherClass()
const anAnotherClass_withParameter 		= new AnAnotherClass("hello parameter")
simpleFunction()


const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

console.log("socket server is running")

const io = new Server(server)

/**
 * @type {SketchApp[]} Array with all Web app connected on server
 */
const appConnected = []

io.sockets.on('connection', () => {
	appConnected.push( new SketchApp() )
})

function newConnection(socket) {
	console.log("new connection : " + socket.id)

	socket.on('mouse', mouseMsg)

	function mouseMsg(data){
		socket.broadcast.emit('mouse',data)
		console.log(data)
	}
}
