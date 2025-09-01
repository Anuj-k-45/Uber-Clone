import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  fetchCoordinates,
  fetchDistanceTime,
  fetchSuggestions,
} from "../controllers/map.controller.js";
import { getAutoCompleteSuggestions } from "../services/maps.service.js";

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
router.get("/suggestions", async (req, res) => {
  try {
    const q = req.query.q;
    const suggestions = await getAutoCompleteSuggestions(q);
    res.json(suggestions);
  } catch (err) {
    console.error("Suggestions error:", err.message);
    res.json([]); // ✅ don’t throw 500, just return []
  }
});


export default router;
