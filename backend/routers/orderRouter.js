import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      userId: req.body.userId,
      orders: req.body.orders,
      shippingAddress: req.body.shippingAddress,
    });
    const ordered = await order.save();
    if (ordered) {
      res.send(ordered);
    }
  })
);

export default orderRouter;
