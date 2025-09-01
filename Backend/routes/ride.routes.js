import express from "express";
import { body } from "express-validator";
import { createRide } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

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

export default router;
