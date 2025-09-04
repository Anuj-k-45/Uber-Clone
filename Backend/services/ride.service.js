import Ride from "../models/ride.model.js";
import * as mapService from "./maps.service.js";
import crypto from "crypto";

// ---------------------
// Utility: Generate OTP
// ---------------------
function getOtp(num) {
  return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

// Utility: Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------
// Fare Calculation
// ---------------------
let lastRequestTime = 0;
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Rate limit: 2 requests per second (500ms between requests)
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < 500) {
    await delay(500 - timeSinceLast);
  }
  lastRequestTime = Date.now();

  // Convert to coordinates if strings
  const origin =
    typeof pickup === "string"
      ? await mapService.getAddressCoordinate(pickup)
      : pickup;

  // Rate limit for second request
  const now2 = Date.now();
  const timeSinceLast2 = now2 - lastRequestTime;
  if (timeSinceLast2 < 500) {
    await delay(500 - timeSinceLast2);
  }
  lastRequestTime = Date.now();

  const dest =
    typeof destination === "string"
      ? await mapService.getAddressCoordinate(destination)
      : destination;

  // Rate limit for third request
  const now3 = Date.now();
  const timeSinceLast3 = now3 - lastRequestTime;
  if (timeSinceLast3 < 500) {
    await delay(500 - timeSinceLast3);
  }
  lastRequestTime = Date.now();

  // Get distance & time from LocationIQ
  const distanceTime = await mapService.getDistanceTime(origin, dest);

  const baseFare = { auto: 30, car: 50, moto: 20 };
  const perKmRate = { auto: 10, car: 15, moto: 8 };
  const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

  return {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance_m / 1000) * perKmRate.auto +
        (distanceTime.duration_s / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance_m / 1000) * perKmRate.car +
        (distanceTime.duration_s / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance_m / 1000) * perKmRate.moto +
        (distanceTime.duration_s / 60) * perMinuteRate.moto
    ),
    distance_m: distanceTime.distance_m,
    duration_s: distanceTime.duration_s,
  };
}

// ---------------------
// Create Ride
// ---------------------
async function initRide({ user, pickup, destination, vehicleType }) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fareDetails = await getFare(pickup, destination);

  const ride = await Ride.create({
    user,
    pickup: typeof pickup === "string" ? pickup : `${pickup.lat},${pickup.lon}`,
    destination:
      typeof destination === "string"
        ? destination
        : `${destination.lat},${destination.lon}`,
    otp: getOtp(6),
    fare: fareDetails[vehicleType],
    distance: fareDetails.distance_m,
    duration: fareDetails.duration_s,
  });

  return ride;
}

// ---------------------
// Confirm Ride
// ---------------------
async function acceptRide({ rideId, captain }) {
  if (!rideId) throw new Error("Ride id is required");

  await Ride.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  return ride;
}

// ---------------------
// Start Ride
// ---------------------
async function startRide({ rideId, otp, captain }) {
  if (!rideId || !otp) throw new Error("Ride id and OTP are required");

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "accepted") throw new Error("Ride not accepted");
  if (ride.otp !== otp) throw new Error("Invalid OTP");

  await Ride.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  return ride;
}

// ---------------------
// End Ride
// ---------------------
async function endRide({ rideId, captain }) {
  if (!rideId) throw new Error("Ride id is required");

  const ride = await Ride.findOne({
    _id: rideId,
    captain: captain._id,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "ongoing") throw new Error("Ride not ongoing");

  await Ride.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  return ride;
}

export { initRide, getFare, acceptRide, startRide, endRide };
