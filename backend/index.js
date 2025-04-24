import express from "express";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
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
