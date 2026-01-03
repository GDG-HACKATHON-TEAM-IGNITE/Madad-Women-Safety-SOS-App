const express = require('express');
const path = require('path');
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*", methods: ["GET", "POST"] } // allow frontend connection
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Socket.IO
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    socket.broadcast.emit("receive-location", {
      id: socket.id,
      ...data,
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", socket.id);
  });
});


// Start server
server.listen(5000, () => console.log("Server running on http://localhost:5000"));
