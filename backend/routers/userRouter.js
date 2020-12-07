import express from "express";
import { data } from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHanlder from "express-async-handler";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHanlder(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default userRouter;
