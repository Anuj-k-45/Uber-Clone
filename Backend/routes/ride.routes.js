import express from "express";
import { body, query } from "express-validator";
import { calculateFare, confirmRide, createRide, finishRide, startRideController } from "../controllers/ride.controller.js";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Health check
router.get("/", (req, res) => {
  res.send("Ride Service is running");
});

router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Invalid pick address"),
  body("destination")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Invalid drop address"),
  body("vehicleType")
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  createRide
);

router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Invalid destination address"),
  calculateFare
);

router.post(
  "/confirm-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  confirmRide
);

router.post("/start-ride", authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
  startRideController
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  finishRide
);




export default router;
