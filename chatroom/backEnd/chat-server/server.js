const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Nhận tin nhắn từ client
  socket.on("send_message", (message) => {
    console.log("Message received:", message);
    // Phát tin nhắn tới tất cả các client
    io.emit("receive_message", message);
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
