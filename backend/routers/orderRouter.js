import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
import nodemailer from "nodemailer";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      userId: req.user._id,
      orders: req.body.orders,
      shippingAddress: req.body.shippingAddress,
    });
    const ordered = await order.save();
    if (ordered) {
      res.send(ordered);
    }
  })
);

orderRouter.post(
  "/order-mail",
  expressAsyncHandler(async (req, res) => {
    //const smtpTransport = mailer.createTransport;
    /*const output = `<p> You have a new contact request<p>
    <h3> Contact Details</h3>
    <ul>
    <li> Name: name</ul>
    <li> Company: Company</ul>
    <li> Email: Email</ul>
    <li> Phone: Phone</ul>
    <h3>Message</h3>
    <p> MESSAGE DESCRIPTION</p>`;*/

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "tomicm990@gmail.com",
        pass: "vojvodina90",
      },
    });
    let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "legionaries.83@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent");
    });
  })
);
export default orderRouter;
