import { validationResult } from "express-validator";
import {
  getFare,
  initRide,
  acceptRide,
  startRide,
  endRide,
} from "../services/ride.service.js";
import {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

async function createRide(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id;
    const ride = await initRide({
      user: userId,
      pickup,
      destination,
      vehicleType,
    });
    const pickupCoordinates = await getAddressCoordinate(pickup);
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      100
    );

    ride.otp = "";

    const rideWithUser = await rideModel.findById(ride._id).populate("user");

    if (!rideWithUser) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (!rideWithUser.user) {
      return res.status(404).json({ error: "No user found for this ride" });
    }

    // Return populated ride

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        type: "new-ride",
        payload: rideWithUser,
      });
    });

    res.status(201).json(rideWithUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const calculateFare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { pickup, destination } = req.query;
    const fare = await getFare(pickup, destination);
    res.status(200).json({ fare });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { rideId } = req.body;
    const captainId = req.user?._id || req.captain?._id;

    if (!rideId || !captainId) {
      return res
        .status(400)
        .json({ error: "Ride ID and Captain ID are required" });
    }

    const ride = await acceptRide({ rideId, captain: { _id: captainId } });

    sendMessageToSocketId(ride.user.socketId, {
      type: "ride-confirmed",
      payload: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    console.error("Error confirming ride:", error);
    res.status(500).json({ error: error.message });
  }
};

const startRideController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { rideId, otp } = req.body;
    const captainId = req.user?._id || req.captain?._id;
    if (!rideId || !otp || !captainId) {
      return res
        .status(400)
        .json({ error: "Ride ID, OTP and Captain ID are required" });
    }
    const ride = await startRide({ rideId, otp, captain: { _id: captainId } });

    sendMessageToSocketId(ride.user.socketId, {
      type: "ride-started",
      payload: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.error("Error starting ride:", error);
    res.status(500).json({ error: error.message });
  }
};

const finishRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { rideId } = req.body;
    const captainId = req.user?._id || req.captain?._id;
    if (!rideId || !captainId) {
      return res
        .status(400)
        .json({ error: "Ride ID and Captain ID are required" });
    }
    const ride = await endRide({ rideId, captain: { _id: captainId } });

    sendMessageToSocketId(ride.user.socketId, {
      type: "ride-ended",
      payload: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    console.error("Error finishing ride:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  createRide,
  calculateFare,
  confirmRide,
  startRideController,
  finishRide,
};
