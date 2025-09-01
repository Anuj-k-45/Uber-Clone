import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "ongoing", "completed", "cancelled"],
      default: "requested",
      required: true,
    },
    duration: {
      type: Number, // in seconds
      default: 0,
    },
    distance: {
      type: Number, // in meters
      default: 0,
    },
    paymentID: {
      type: String,
      default: null,
    },
    orderID: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
