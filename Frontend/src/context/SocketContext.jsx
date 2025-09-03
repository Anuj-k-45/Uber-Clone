import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const url = "http://localhost:4000"

const socket = io(url); // Replace with your server URL

const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export { SocketContext };