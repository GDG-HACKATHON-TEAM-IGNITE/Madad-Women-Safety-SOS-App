import { io } from "socket.io-client";
import { BACKEND_URL } from "../config/api";

console.log("BACKEND URL:", BACKEND_URL);
export const socket = io(BACKEND_URL, {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});
