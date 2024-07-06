const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const users = [{}];
app.use(cors());
const port = 4500 || process.env.PORT;

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has Joined`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]}`,
    });
  });
  socket.on("disconnect", ({ user }) => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });

    console.log(`User Left`);
  });
  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id }); 
  });
});

app.get("/", (req, res) => {
  res.send("Hello There");
});

server.listen(port, () => {
  console.log(`server is listening on : http://localhost:${port}`);
});
