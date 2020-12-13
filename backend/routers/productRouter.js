import express from "express";
import expressAsyncHandler from "express-async-handler";
import { data } from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// Just for adding template data
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.put(
  "/addreview/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.reviews = [...product.reviews, req.body.review];
      const response = await product.save();
      if (response) {
        res.send(response);
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.put(
  "/addrating/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const ratingFound = product.ratings.find((rating, index) => {
        if (rating.userId === req.body.rating.userId) {
          product.ratings[index].rating = req.body.rating.rating;
          product.ratings.splice(index, 1, rating);
        }
        return true;
      });
      if (!ratingFound) {
        product.ratings = [...product.ratings, req.body.rating];
      }
      const response = await product.save();
      if (response) {
        res.send(response);
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
