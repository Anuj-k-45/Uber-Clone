import mongoose from "mongoose";
import brypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await brypt.hash(this.password, 10);
//   }
//   next();
// });

UserSchema.statics.hashPassword = async function (password) {
  return await brypt.hash(password, 10);
};

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

UserSchema.methods.comparePassword = async function (password) {
  return await brypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
