import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

const login = async (req, res, next) => {};

const registerUser = async (req, res, next) => {
  console.log(req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword = await UserModel.hashPassword(password);

  const user = await createUser(fullname.firstname, fullname.lastname, email, hashedPassword);

  const token = await user.generateAuthToken();

  return res.status(201).json({ token, user });
};

export { registerUser };
