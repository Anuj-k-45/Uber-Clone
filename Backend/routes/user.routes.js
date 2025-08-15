import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/user/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname").isLength({ min: 2 }).withMessage("Name must be at leastt"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least"),
  ],
  registerUser
);


export default router;
