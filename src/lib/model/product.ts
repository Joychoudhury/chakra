import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  description: String,
  imageSrc: String,
  category: String,
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
