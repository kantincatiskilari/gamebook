import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = await new Comment({
      ...req.body,
      userId: req.user.id,
      postId: req.params.postId,
    });
    const savedComment = await comment.save();

    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    !comment && res.status(404).json("Post not found");

    if (comment.userId === req.user.id) {
      await Comment.findByIdAndDelete(comment._id);
    } else {
      res.status(403).json("Unauthorized");
    }

    res.status(200).json("Comment deleted.");
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch {
    next(err);
  }
};
