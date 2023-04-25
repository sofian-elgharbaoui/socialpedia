import { io } from "socket.io-client";

const URI =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export const socket = io(URI, { autoConnect: false });
