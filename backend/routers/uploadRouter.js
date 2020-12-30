import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname.split(".")[0]}.jpg`);
  },
});

const upload = multer({ storage }).array("images", 10);

uploadRouter.post("/", isAuth, upload, (req, res) => {
  let paths = [];
  for (var i = 0; i < req.files.length; i++) {
    paths.push(`/${req.files[i].path}`);
  }
  res.send(paths);
});

export default uploadRouter;
