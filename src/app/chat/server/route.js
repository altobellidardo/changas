const { Socket } = require('socket.io')

export default function Handler (req, res) {
  const io = new Socket(req, res)
  res.socket.server.io = io

  io.on('connection', (socket) => {
    console.log('socket connected')
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg)
    })
  })
}
