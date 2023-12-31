const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const setupWSHandler = require("./src/websocket");
require("dotenv").config;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/assets/uploads", express.static(path.resolve(__dirname, "assets", "uploads")));
app.use("/", require("./src/routes"));

const server = http.createServer(app);
const io = new socketIO.Server(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => { console.log(`server running on ${PORT}`); });

setupWSHandler(io);

module.exports = app;
