import express from "express";
import expressAsyncHandler from "express-async-handler";
import Newsletter from "../models/newsletterModel.js";

const newsletterRouter = express.Router();

newsletterRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const newsletter = new Newsletter({ email: req.body.email });
    const response = await newsletter.save();
    if (response) {
      res.send(response);
    }
  })
);

export default newsletterRouter;
