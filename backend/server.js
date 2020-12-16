import express from "express";
import { data } from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import newsletterRouter from "./routers/newsletterRouter.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/furniture-ecommerce",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/newsletters", newsletterRouter);

const __dirname = path.resolve();
console.log(path.join(__dirname, "/frontend/build"));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
