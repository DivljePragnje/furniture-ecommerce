import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const ratingSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number },
  materials: { type: [String] },
  onDiscount: { type: Number },
  reviews: [reviewSchema],
  ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
