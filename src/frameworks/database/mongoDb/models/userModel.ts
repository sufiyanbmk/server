import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "please add a user name"],
    },
    email: {
      type: String,
      required: [true, "please add a email"],
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    profileImage: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
    socket_id: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Online", "Offline"],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema, "users");

export default User;
