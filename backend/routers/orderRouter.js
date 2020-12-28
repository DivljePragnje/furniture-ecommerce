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
    const transport = {
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
    /* MAIL TO ADMIN */
    const writeOrders = (orders) => {
      let ordersHtml = "";
      orders.map((order) => {
        ordersHtml += `<tr>
                  <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">${order.name}</th>
                  <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">${order.material}</th>
                  <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">${order.qty}</th>
                </tr>`;
      });
      return ordersHtml;
    };
    const htmlToAdmin = `<center><p> <b>Ime i prezime:</b> ${req.body.shippingAddress.name.toUpperCase()} ${req.body.shippingAddress.surname.toUpperCase()}<p>
    <p><b>Adresa isporuke:</b> ${req.body.shippingAddress.address.toUpperCase()}, ${req.body.shippingAddress.city.toUpperCase()}, ${
      req.body.shippingAddress.postalcode
    }</p>
    <p><b>Telefon:</b>${req.body.shippingAddress.phone}</p>
    <h3><b>Narudžbenica:</b> ${req.body._id}</h3>
    <table style=" width:75%">
      <tr>
        <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">Artikl</th>
        <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">Materijal</th>
        <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">Količina</th>
      </tr>
      ${writeOrders(req.body.orders)}
    </table>
    </center>`;

    var mailToAdmin = {
      from: req.body.shippingAddress.email,
      to: "stolarijatopic@gmail.com",
      subject: "NOVA NARUDŽBINA",
      html: htmlToAdmin,
    };
    transporter.sendMail(mailToAdmin, (err, data) => {
      if (err) {
        res.json({
          msg: "fail",
        });
      } else {
        res.json({
          msg: "success",
        });
      }
    });

    /* MAIL TO COSTUMER */

    const htmlToCostumer = `<center><p>Zdravo! ${
      req.body.shippingAddress.name
    } ${req.body.shippingAddress.surname}</p>
    <p>Hvala Vam na Vasoj narudžbini.</p>
    <h2>Vaša narudžbina #${req.body._id}</h2>
    <p>Naručeno: VREME</p>
    <table style=" width:75%">
      <tr>
        <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">Artikl</th>
        <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">Materijal</th>
        <th style="border: 1px solid #dddddd;text-align:left;padding: 8px">Količina</th>
      </tr>
      ${writeOrders(req.body.orders)}
    </table>
    </center>
    `;

    var mailToCostumer = {
      from: "stolarijatopic@gmail.com",
      to: req.body.shippingAddress.email,
      subject: "STOLARIJA TOPIĆ: potvrda narudžbine",
      html: htmlToCostumer,
    };
    transporter.sendMail(mailToCostumer, (err, data) => {
      if (err) {
        res.json({
          msg: "fail",
        });
      } else {
        res.json({
          msg: "success",
        });
      }
    });
  })
);
export default orderRouter;
