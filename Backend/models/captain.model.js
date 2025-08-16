import mongoose from "mongoose";
import brypt from "bcrypt";
import jwt from "jsonwebtoken";

const CaptainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [2, "First name must be at least 2 characters long"],
    },
    lastname: {
      type: String,
      minlength: [2, "Last name must be at least 2 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

CaptainSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

CaptainSchema.methods.comparePassword = async function (password) {
  return await brypt.compare(password, this.password);
};

CaptainSchema.statics.hashPassword = async function (password) {
  return await brypt.hash(password, 10);
};


export default mongoose.model("Captain", CaptainSchema);
