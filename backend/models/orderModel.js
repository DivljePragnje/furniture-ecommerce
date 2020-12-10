import mongoose from "mongoose";

const singleOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  material: { type: String, required: false },
  price: { type: Number, required: false },
  qty: { type: Number, required: false },
  onDiscount: { type: Number },
});

const shippingAddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
});

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    orders: [singleOrderSchema],
    shippingAddress: shippingAddressSchema,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
