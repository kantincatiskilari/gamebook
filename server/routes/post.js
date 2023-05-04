import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  likeAPost,
  viewPost,
  userPosts,
  unlikeAPost,
} from "../controllers/post.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a post
router.post("/", verifyToken, createPost);
//update a post
router.put("/update/:postId", verifyToken, updatePost);
//delete a post
router.delete("/delete/:postId", verifyToken, deletePost);
//get user posts
router.get("/:userId", userPosts);
//get a post
router.get("/find/:postId", getPost);
//like a post
router.put("/like/:postId", verifyToken, likeAPost);
//unlike a post
router.put("/unlike/:postId", verifyToken, unlikeAPost);
//view a post
router.put("/view/:postId", viewPost);

export default router;
