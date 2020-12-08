import express from "express";
import { data } from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHanlder from "express-async-handler";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHanlder(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHanlder(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid User mail or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHanlder(async (req, res) => {
    console.log(req);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const data = await user.save();
    res.send({
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: user.isAdmin,
      token: generateToken(data),
    });
  })
);

export default userRouter;
