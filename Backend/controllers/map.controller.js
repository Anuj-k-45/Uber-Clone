import {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
} from "../services/maps.service.js";

// Controller: fetch coordinates
export const fetchCoordinates = async (req, res) => {
  const { address } = req.body;
  try {
    const coords = await getAddressCoordinate(address);
    res.json(coords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: fetch distance & time
export const fetchDistanceTime = async (req, res) => {
  const { origin, destination } = req.body;

  try {
    // Step 1: Convert addresses into coordinates
    const originCoords =
      typeof origin === "string" ? await getAddressCoordinate(origin) : origin;
    const destCoords =
      typeof destination === "string" ? await getAddressCoordinate(destination) : destination;

    // Step 2: Get route
    const result = await getDistanceTime(originCoords, destCoords);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: fetch autocomplete suggestions
export const fetchSuggestions = async (req, res) => {
  const { input } = req.body;
  try {
    const suggestions = await getAutoCompleteSuggestions(input);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
