const express = require("express");
const router = require("./server/routes/routes");
const socket = require("socket.io");

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening !!!");
});

const x = 0;
const staticPath = "./server/public";
app.use(express.static(staticPath));
console.log(staticPath);
app.use(router);
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Socket is established !!!");

  socket.on("chat", (data) => {
    io.sockets.emit("msg", data);
  });
});
