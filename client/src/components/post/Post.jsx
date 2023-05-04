import "./post.css";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { format } from "timeago.js";
import { postDelete } from "../../redux/postSlice";
import { commentDelete } from "../../redux/commentSlice";
import NewPost from "../newPost/NewPost";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Post = React.memo(function (post) {
  const dispatch = useDispatch();
  const [postLiked, setPostLiked] = useState(false);
  const [like, setLike] = useState();
  const { user } = useSelector((state) => state.user);
  const [openPopup, setOpenPopup] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [postUser, setPostUser] = useState([]);


  useEffect(() => {
    const postFetch = async () => {
      try {
        const res = await axios.get("/posts/find/" + post?.post._id);
        setLike(res.data.fav.length);
        setPostLiked(res.data.fav.includes(user._id) ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    postFetch();
  }, [postLiked]);

  useEffect(() => {
    const commentFetch = async () => {
      try {
        const res = await axios.get("/comments/post/" + post.post._id);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    commentFetch();
  }, [post]);

  useEffect(() => {
    const userFetch = async () => {
      try {
        const res = await axios.get("/users/find/" + post?.post.userId);
        setPostUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    userFetch();
  }, [user?._id]);

  const handleLike = async (e) => {
    e.preventDefault();
    setPostLiked(!postLiked);
    try {
      if (!postLiked) {
        await axios.put("/posts/like/" + post?.post._id);
        setLike(like + 1);
      } else {
        await axios.put("/posts/unlike/" + post?.post._id);
        setLike(like - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = async (e) => {
    try {
      await axios.put("/posts/view/" + post?.post._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = async (e) => {
    e.preventDefault();
    setOpenPopup(true);
  };

  const handleClose = async () => {
    setOpenPopup(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (post.post.postId) {
        await axios.delete("/comments/delete/" + post.post._id);
        dispatch(commentDelete(post.post._id));
      } else {
        await axios.delete("/posts/delete/" + post?.post._id);
        setOpenPopup(false);
        dispatch(postDelete(post?.post._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    setOpenComment(!openComment);
  };

  return (
    <>
      <div className={openPopup ? "popup-opened" : "popup"}>
        <div className="popupWrapper">
          <div className="popupQuestion">Are you sure to delete this post?</div>
          <div className="popupButtons">
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleDelete}>Yes</button>
          </div>
        </div>
      </div>
        <Link className="link" to={`/post/${post.post?._id}`}>
          <div className="post" onClick={handleView}>
            <div className="postUserInfo">
              <div className="postUserImg">
                <LazyLoadImage
                  src={
                    postUser?.avatar
                      ? postUser.avatar
                      : "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                  }
                  alt=""
                  effect="blur"
                />
              </div>
              <Link className="link" to={"/profile/" + postUser?._id}>
                <div className="postUser">@{postUser?.username}</div>
              </Link>
              •<div className="postDate">{format(post.post?.createdAt)}</div>
              {post.post?.userId === user?._id ? (
                <div className="postDeleteIcon" onClick={handleOpen}>
                  <DeleteOutlineOutlinedIcon />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="postDescInfo">
              <div className="postDesc">{post.post?.desc}</div>
            </div>
            {post.post.postId ? (
              ""
            ) : (
              <div className="postStatistics">
                <div className="postView">
                  <div className="postIcon">
                    <BarChartOutlinedIcon />
                  </div>
                  <span>{post.post?.views}</span>
                </div>
                <div className="postComment" onClick={handleComment}>
                  <div className="postIcon">
                    <QuestionAnswerOutlinedIcon />
                  </div>
                  <span>{comments?.length}</span>
                </div>
                <div className="postLike" onClick={handleLike}>
                  <div className="postIcon">
                    {postLiked ? (
                      <FavoriteIcon style={{ color: "rgb(255, 0, 66)" }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </div>
                  <span>{like}</span>
                </div>
              </div>
            )}
          </div>
        </Link>
      <div
        className={
          openComment ? "postCommentContainer-open" : "postCommentContainer"
        }
      >
        <NewPost
          type="comment"
          setOpenComment={setOpenComment}
          postId={post.post._id}
          key={post._id}
        />
      </div> 
    </>
  );
});

export default Post;
