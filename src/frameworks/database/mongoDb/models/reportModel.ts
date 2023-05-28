import mongoose, { Schema, model } from "mongoose";

const reportSchma = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
    },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reports = model("Reports", reportSchma, "reports")

export default Reports