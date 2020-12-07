import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String },
  rating: { type: Number },
});

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
});

const Product = mongoose.model("Product", productSchema);

export default Product;
