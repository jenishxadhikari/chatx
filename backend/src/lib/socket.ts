import { createServer } from "node:http";
import { Server } from "socket.io";

import { app } from "@/app";
import { env } from "@/config/env";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.APP_ORIGIN
  },
});

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId as string

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

export { io, server };
