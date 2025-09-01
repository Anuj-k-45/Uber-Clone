import axios from "axios";
import captainModel from "../models/captain.model.js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.LOCATIONIQ_API_KEY;

// Get coordinates from address (Forward Geocoding)
export async function getAddressCoordinate(address) {
  if (!address) throw new Error("Address is required");
  const url =
    `https://us1.locationiq.com/v1/search` +
    `?key=${API_KEY}` +
    `&q=${encodeURIComponent(address)}` +
    `&format=json&limit=1&countrycodes=in`; // bias to India
  const { data } = await axios.get(url);
  if (!Array.isArray(data) || data.length === 0)
    throw new Error("Unable to fetch coordinates");

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}

// Get distance & time between origin and destination
export async function getDistanceTime(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    const url = `https://us1.locationiq.com/v1/directions/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?key=${API_KEY}&overview=false`;

    const response = await axios.get(url);

    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const route = response.data.routes[0];
      return {
        distance_m: route.distance,
        duration_s: route.duration,
        distance_km: (route.distance * 1.2 / 1000).toFixed(2),  //inflation in driving
        duration_min: (route.duration / 60).toFixed(2),
      };
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

// Get autocomplete suggestions
export async function getAutoCompleteSuggestions(input) {
  if (!input) throw new Error("Input query is required");

  try {
    const url = `https://us1.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${encodeURIComponent(
      input
    )}&limit=5`;

    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      return response.data.map((item) => item.display_name);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Get captains within radius (MongoDB geospatial query)
export async function getCaptainsInTheRadius(ltd, lng, radius) {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371], // radius in km
      },
    },
  });
  return captains;
}
