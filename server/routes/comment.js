import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";

const router = express.Router();

//add comment
router.post("/:postId", verifyToken, createComment);
//delete a comment
router.delete("/delete/:commentId", verifyToken, deleteComment);
//get all comments of a post
router.get("/post/:postId", getComments);

export default router;
