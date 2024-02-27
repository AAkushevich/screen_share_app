// socketController.js

function handleSocketConnection(io) {
  
  return (socket) => {
    console.log('A user connected via socket:', socket.id);


    // Handle socket events
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    socket.on('send_screenshot', (message) => {
      console.log('Received screenshot bytes:', message);
      // Handle the received message
      // Example: broadcast the message to all connected clients
      io.emit('get_screenshot', message);
    });

    // You can add more socket event handlers here as needed
  };
}

module.exports = { handleSocketConnection };
