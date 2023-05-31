import mongoose, { Schema, model } from "mongoose";

const callModel = new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verdict: {
      type: String,
      enum: ["Accepted", "Denied", "Missed", "Busy"],
    },
    status: {
      type: String,
      enum: ["Ongoing", "Ended"],
    },
    startedAt: {
      type: Date,
      default: Date.now(),
    },
    endedAt: {
      type: Date,
    },
  });
  const Call = model("Call", callModel, "call")
  export default Call;