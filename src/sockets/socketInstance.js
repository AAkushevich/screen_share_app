
const { Server } = require("socket.io");
const httpServer = require("http").createServer();

const io = new Server(httpServer);

module.exports = io;