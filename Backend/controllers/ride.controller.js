import { validationResult } from "express-validator";
import { getFare, initRide } from "../services/ride.service.js";

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
    res.status(201).json(ride);
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
