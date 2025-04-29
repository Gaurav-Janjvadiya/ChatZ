import express from "express";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

import http from "http";
import cors from "cors";
config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.use((err, req, res) => {
  console.log(err);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected ", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
  });
  socket.on("send_message", (room, message, sender) => {
    io.to(room).emit("new_message", {
      sender,
      message
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
