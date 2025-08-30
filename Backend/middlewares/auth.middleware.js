import userModel from "../models/user.model.js";
import blacklistModel from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";

const authUser = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isTokenBlacklisted = await blacklistModel.exists({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let user = null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    user = await userModel.findById(decoded._id);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};

const authCaptain = async (req, res, next) => {
  let token;

  // Get token from cookie or header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("The token is: " + token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isTokenBlacklisted = await blacklistModel.exists({ token });
  if (isTokenBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    req.captain = captain;
    next();
  } catch (err) {
    // Handle invalid/expired token
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export { authUser, authCaptain };
