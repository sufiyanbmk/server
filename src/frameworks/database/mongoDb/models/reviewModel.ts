import mongoose, { Schema, model } from "mongoose";

const reviewSchma = new Schema(
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
      reviewText: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },
    { timestamps: true }
  );
  
  const Reviews = model("Reviews", reviewSchma, "reviews")
  
  export default Reviews