import { validationResult } from "express-validator";
import { getFare, initRide } from "../services/ride.service.js";
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
    console.log("req.user:", req.user);
    console.log("ride:", ride);
    console.log(pickup);
    const pickupCoordinates = await getAddressCoordinate(pickup);
    console.log(JSON.stringify(pickupCoordinates));
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      100
    );
    console.log(JSON.stringify(captainsInRadius));

    ride.otp = "";

    console.log("ride before populate:", ride);

    const rideWithUser = await rideModel.findById(ride._id).populate("user");

    if (!rideWithUser) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (!rideWithUser.user) {
      return res.status(404).json({ error: "No user found for this ride" });
    }

    console.log("rideWithUser after populate:", rideWithUser);

    // Return populated ride

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        type: "new-ride",
        payload: rideWithUser,
      });
    });

    console.log("Ride created successfully!");
    

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

export { createRide, calculateFare };
