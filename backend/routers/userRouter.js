import express from "express";
import { data } from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHanlder from "express-async-handler";
import { generateToken, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHanlder(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
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
    res.status(401).send({ message: "Invalid Email or password" });
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHanlder(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    user
      .save()
      .then(() => {
        /*const transport = {
          host: "smtp.gmail.com",
          auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSWORD,
          },
        };
        var transporter = nodemailer.createTransport(transport);

        transporter.verify((error, success) => {
          if (error) {
            console.log(error);
          }
        });
        const html = `<center> <p>Zdravo ${req.body.name}</p>
        <p>Hvala što ste otvorili svoj nalog.</p>
        <p>Da biste se prijavili na našu adresu, koristite email i password koji ste uneli prilikom kreiranja naloga</p>
        <p>Veliki pozdrav!</p>
        </center>`;
        var mail = {
          from: "stolarijatopic@gmail.com",
          to: req.body.email,
          subject: "DOBRODOŠLI",
          html: html,
        };
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            res.json({
              msg: "fail",
            });
          } else {
            res.json({
              msg: "success",
            });
          }
        });*/
        res.send({
          _id: data._id,
          name: data.name,
          email: data.email,
          isAdmin: user.isAdmin,
          token: generateToken(data),
        });
      })
      .catch((err) =>
        res.status(400).send({ message: "Email is already taken" })
      );
  })
);

export default userRouter;
