// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const socketRoutes = require('./src/routes/socketRoutes');
const { handleSocketConnection } = require('./src/controllers/socketController'); // Import the function properly
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes); // User routes
app.use('/api/socket', socketRoutes); // Socket routes

// Pass io instance to handleSocketConnection
io.on('connection', handleSocketConnection(io)); // Pass io instance as an argument

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
