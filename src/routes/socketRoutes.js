const express = require("express");
const router = express.Router();
const { handleSocketConnection } = require("../controllers/socketController");
const io = require("../sockets/socketInstance");

io.on("connection", handleSocketConnection);

module.exports = router;