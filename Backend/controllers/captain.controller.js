import { validationResult } from "express-validator";
import CaptainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import blacklistModel from "../models/blacklist.model.js";

const registerCaptain = async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await CaptainModel.findOne({ email });
    if (isCaptainExists) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await CaptainModel.hashPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateToken();

    return res.status(201).json({ token, captain });
  } catch (error) {
    next(error);
  }
};

const loginCaptain = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateToken();
    res.cookie("token", token);

    return res.status(200).json({ token, captain });
  } catch (error) {
    next(error);
  }
};

const getCaptain = async (req, res, next) => {
  const captain = req.captain;
  return res.status(200).json({ captain });
};

const logoutCaptain = async (req, res, next) => {
  try {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistModel.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "User was not logged in to perform logout" });
  }
};

export { registerCaptain, loginCaptain, getCaptain, logoutCaptain };
