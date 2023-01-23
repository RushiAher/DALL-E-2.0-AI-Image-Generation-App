import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    // console.log("inside post route");
    const { name, prompt, photo } = req.body;
    console.log(name);
    console.log(prompt);
    // console.log(photo);
    const photoUrl = await cloudinary.uploader.upload(
      photo,
      { timeout: 600000 },
      function (error, result) {
        console.log(error + result);
      }
    );

    console.log("photo url " + photoUrl);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });
    // console.log("new post " + newPost);
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

export default router;
