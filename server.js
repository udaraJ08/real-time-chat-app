const express = require("express");
const router = require("./server/routes/routes");
const socket = require("socket.io");

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening !!!");
});

const staticPath = "./server/public";
app.use(express.static(staticPath));
app.use(router);
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Socket is established !!!");

  socket.on("chat", (data) => {
    io.sockets.emit("msg", `${data.name}: ${data.message}`);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("status", `${data.name} ${data.status}`);
  });

  socket.on("join", (data) => {
    socket.broadcast.emit("join", `${data.name} joined`);
  });

  socket.on("disconnect", function () {
    io.sockets.emit("disconnect", "left");
  });
});
