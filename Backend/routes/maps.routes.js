import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  fetchCoordinates,
  fetchDistanceTime,
  fetchSuggestions,
} from "../controllers/map.controller.js";

const router = express.Router();

// Health check
router.get("/", (req, res) => {
  res.send("Maps Service is running");
});

// Get coordinates for an address
router.post("/get-coordinates", authUser, fetchCoordinates);

// Get distance & time between two points
router.post("/get-distance-time", authUser, fetchDistanceTime);

// Get autocomplete suggestions
router.post("/get-suggestions", authUser, fetchSuggestions);

export default router;
