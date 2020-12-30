import express from "express";
import expressAsyncHandler from "express-async-handler";
import { data } from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

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
  "/populate/seed",
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
      if (product.reviews) {
        product.reviews = [...product.reviews, req.body.review];
      } else {
        product.reviews = req.body.review;
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

productRouter.post(
  "/create",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "name",
      description: "description",
      images: [],
      category: "description",
      price: 0,
      countInStock: 0,
      materials: [],
      onDiscount: 0,
      reviews: [],
      ratings: [],
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res.send({ message: "Product is added!", product: createdProduct });
    }
  })
);

productRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.onDiscount = req.body.onDiscount || product.onDiscount;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.description = req.body.description || product.description;
      product.images = req.body.images || product.images;
      product.materials = req.body.materials || product.materials;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/delete/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
