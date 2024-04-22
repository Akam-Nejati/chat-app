import { io } from "socket.io-client";

const soket = io("ws://localhost:3001")
export function useSocket() {
  return soket
}
