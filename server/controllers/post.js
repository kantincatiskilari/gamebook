import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const createPost = async (req, res, next) => {
  try {
    const post = await new Post({
      ...req.body,
      userId: req.user.id,
    });
    const savedPost = await post.save();

    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    !post && res.status(404).json("Post not found");

    await Post.findByIdAndUpdate(req.params.postId, {
      $set: req.body,
    });

    res.status(200).json("Post updated successfuly");
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    !post && res.status(404).json("Post not found");

    if (post.userId === req.user.id) {
      await Post.findByIdAndDelete(req.params.postId);
      await Comment.deleteMany({ postId: req.params.postId });
    } else {
      res.status(403).json("Unauthorized");
    }

    res.status(200).json("Post deleted.");
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    !post && res.status(404).json("Post not found");

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const userPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const likeAPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.postId);
    if (!post.fav.includes(user._id)) {
      await Post.findByIdAndUpdate(req.params.postId, {
        $addToSet: { fav: user._id },
      });
      res.status(200).json("Post has been liked");
    }
  } catch (err) {
    next(err);
  }
};

export const unlikeAPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.postId);
    if (post.fav.includes(user._id)) {
      await Post.findByIdAndUpdate(req.params.postId, {
        $pull: { fav: user._id },
      });
      res.status(200).json("Post has been unliked");
    }
  } catch (err) {
    next(err);
  }
};

export const viewPost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, { $inc: { views: 1 } });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};
