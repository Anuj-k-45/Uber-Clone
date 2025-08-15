import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Some error occured : " + err));
}

export default connectDB;