import express from "express";
import { body } from "express-validator";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname")
      .isLength({ min: 2 })
      .withMessage("Name must be at leastt"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least"),
  ],
  loginUser
);

router.get("/profile", authUser, getUser);

router.get("/logout", logoutUser)

export default router;
