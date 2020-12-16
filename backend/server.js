import express from "express";
import { data } from "./data.js";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import newsletterRouter from "./routers/newsletterRouter.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.envMONGODB_URL || "mongodb://localhost/furniture-ecommerce",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/newsletters", newsletterRouter);

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
