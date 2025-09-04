import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import Ride from "./models/ride.model.js";

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        const user = await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        console.log(user);
      } else if (userType === "captain") {
        const captain = await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        console.log(captain);
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data; // userId here is captainId
        if (!location || !location.ltd || !location.lng) {
          return socket.emit("error", { message: "Invalid location data" });
        }

        // update captain location in DB (existing)
        await captainModel.findByIdAndUpdate(userId, {
          location: { ltd: location.ltd, lng: location.lng },
        });

        // find active ride for this captain
        const ride = await Ride.findOne({
          captain: userId,
          status: { $in: ["accepted", "ongoing"] },
        }).populate("user");

        const payload = {
          lat: location.ltd,
          lng: location.lng,
          ts: Date.now(),
          heading: location.heading ?? null,
          captainId: userId,
          rideId: ride ? ride._id : null,
        };

        // broadcast to room for this ride (if clients joined)
        if (ride && ride._id) {
          io.to(`ride:${ride._id.toString()}`).emit(
            "captainLocationUpdate",
            payload
          );
        }

        // also send directly to the rider socketId if present
        if (ride && ride.user && ride.user.socketId) {
          io.to(ride.user.socketId).emit("captainLocationUpdate", payload);
        }

        // optional: emit ack to captain
        socket.emit("location-ack", { ok: true, ts: payload.ts });
      } catch (err) {
        console.error("Error in update-location-captain", err);
      }
    });

    socket.on("join", async (data) => {
      const { userId, userType, rideId } = data || {};
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
      // if client passes rideId, join that room
      if (rideId) {
        socket.join(`ride:${rideId}`);
      }
    });


    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    console.log(`📨 Sending message to socket ${socketId}:`, messageObject);
    io.to(socketId).emit(messageObject.type, messageObject.payload); // ✅ use type/payload
    console.log("Message sent successfully.");
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
