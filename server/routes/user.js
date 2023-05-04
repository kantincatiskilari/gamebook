import express from "express";

import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  getTimelinePosts,
  randomUsers,
  randomPosts,
  unfollowUser,
  getByUsername,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get a user
router.get("/find/:userId", getUser);
//get a user by username
router.get("/find/user/:username", getByUsername);
//update user
router.put("/:userId", verifyToken, updateUser);
//delete user
router.delete("/:userId", verifyToken, deleteUser);
//follow user
router.put("/follow/:userId", verifyToken, followUser);
//unfollow user
router.put("/unfollow/:userId", verifyToken, unfollowUser);
//random users
router.get("/random/:userId", verifyToken, randomUsers);
//random posts
router.get("/explore/posts", randomPosts);
//users timeline posts
router.get("/timeline", verifyToken, getTimelinePosts);

export default router;
