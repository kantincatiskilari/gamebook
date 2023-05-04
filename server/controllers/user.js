import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    !user && res.status(404).json(user);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const getByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    !user && res.status(404).json("User not found");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const randomPosts = async (req, res, next) => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getTimelinePosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const followings = user.followings;
    followings.push(user._id);
    !user && res.status(404).json("User not found");

    const posts = await Promise.all(
      followings.map(async (friendId) => {
        return await Post.find({ userId: friendId });
      })
    );
    res
      .status(200)
      .json(posts.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const randomUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 4 } }]);

    const newList = users.filter((user) => user._id != req.params.userId);

    res.status(200).json(newList);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    let { password, ...others } = user._doc;
    others["access_token"] = true;

    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    try {
      await Post.deleteMany({ userId: req.user.id });
      await Comment.deleteMany({ userId: req.user.id });
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json("Unauthorized");
  }
};

export const followUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    !user && res.status(404).json("User not found");

    if (!user.followings.includes(req.params.userId)) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { followings: req.params.userId },
      });
      await User.findByIdAndUpdate(req.params.userId, {
        $push: { followers: req.user.id },
      });
      res.status(200).json("User has been followed");
    }
  } catch (err) {
    next(err);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    !user && res.status(404).json("User not found");

    if (user.followings.includes(req.params.userId)) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { followings: req.params.userId },
      });
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { followers: req.user.id },
      });
      res.status(200).json("User has been unfollowed");
    }
  } catch (err) {
    next(err);
  }
};
