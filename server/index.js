
// HTTP Library
const http = require('http')
const express = require('express');
require('dotenv').config()
const cors = require('cors')
const app = express();
app.use(cors())

// require server class from socket io
const {Server} = require('socket.io')

// create socket server variable from Server class 
const server = http.createServer(app)

// add information related with cors for client-server communication
const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000", //frontend (react-app) link
    methods: ["GET", "POST"]
  }
})

// events are emitted from the frontend to this backend
// to start listenning to events

// 'connection' event is the first event we need to listen to anytime we have a socket.io server
// this event is listened when a user opens/runs/connects to the server at the client side

io.on("connection", (socket)=>{
  // we can use this log to detect whenever someone opens the website
  // console.log(`User connected: ${socket.id}`); //every user connected has a unique-different id

  // now listen to the event we named in the frontend (i.e, <send_message>)
  socket.on('send_message', (data)=>{
    // we can do what we want with this data
    console.log(data) 

    // Creating room event like group chats
    socket.join("join_room", data=>{
      socket.join(data)
    })
    // you can emit to a particular room
    socket.to(data.room).emit("receive_message", data)

    // In this case we will emit this data back to the frontend using the broadcast method
    // broadcast sends data to everyone but yourself, e.g: normal chats in whatsapp
    // socket.broadcast.emit("receive_message", data)
  })

  
})

server.listen(process.env.PORT, ()=>{
  console.log('Server running on port', process.env.PORT)
})
