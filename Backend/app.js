import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { urlencoded } from "express";

//Connecting to db
import connectDB from "./db/db.js";
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Controllers import
import { registerUser } from "./controllers/user.controller.js";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", registerUser);

export default app;
