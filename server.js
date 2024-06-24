import express from "express";
import dotenv from "dotenv";
import dbConnection from "./databases/dbConnection.js";
import morgan from "morgan";
dotenv.config();
import cors from "cors";

import { init } from "./src/modules/index.js";
import { Server } from "socket.io";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded,, form-data
app.use(express.static("uploads"));
const port = 3000;
app.use(cors());
app.use(morgan("dev"));

dbConnection();
init(app);
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
process.on("unhandledtRejection", (err) => {
  console.log(err);
});

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  socket.on("newMessage", (data) => {
    console.log(data);
    socket.broadcast.emit("replay", data);
  });
  socket.on("userTyping", (data) => {
    console.log("Typing");
    socket.broadcast.emit("Typing", "Typing");
  });
  socket.on("stopTyping", (data) => {
    console.log("stopTyping");
    socket.broadcast.emit("stopUserTyping", "Typing");
  });
});
