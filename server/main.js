import express from "express"
import {Server} from "socket.io"


// example importation
import {AnAnotherClass, ExternalClass, simpleFunction} from "./sampleModules.js"

// simple class and function from other files importation
const externalClass 					= new ExternalClass()
const anAnotherClass_withoutParameter 	= new AnAnotherClass()
const anAnotherClass_withParameter 		= new AnAnotherClass("hello parameter")
simpleFunction()
// example importation


const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

console.info("server is running on http://localhost:3000/")

const io = new Server(server)

io.sockets.on('connection', socket => {
	console.log("new connection : " + socket.id)

	socket.on('newSketchData', data => {
		onNewSketchData(data, socket)
	})
})

function onNewSketchData(data, socket) {
	//console.log(data)
	socket.broadcast.emit('sketchDataUpdated',data)
}
