import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { urlencoded } from "express";

//Connecting to db
import connectDB from "./db/db.js";
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Routes import
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import cookieParser from "cookie-parser";


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/ride", rideRoutes);


export default app;
