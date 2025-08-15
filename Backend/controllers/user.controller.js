import UserModel from "../models/user.model.js";
import blacklistModel from "../models/blacklist.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

const loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();

  res.cookie("token", token);

  console.log("Logged in successfully...");

  return res.status(200).json({ token, user });
};

const registerUser = async (req, res, next) => {
  console.log(req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword = await UserModel.hashPassword(password);

  const user = await createUser(
    fullname.firstname,
    fullname.lastname,
    email,
    hashedPassword
  );

  const token = await user.generateAuthToken();

  return res.status(201).json({ token, user });
};

const getUser = async (req, res, next) => {
  const user = req.user;
  return res.status(200).json({ user });
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklistModel.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, getUser, logoutUser };
