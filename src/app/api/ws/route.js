export function SOCKET (client, _request, server) {
  // Send messages to all connected clients
  client.on('message', payload => {
    // Send messages to all connected clients, except the sender
    server.clients.forEach(receiver => {
      if (receiver === client) return
      receiver.send(payload)
    })
  })
}