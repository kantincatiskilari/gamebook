import "./singlePost.css";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Post from "../../components/post/Post";
import { useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewPost from "../../components/newPost/NewPost";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchCommentSuccess } from "../../redux/commentSlice";

export default function SinglePost() {
  let path = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { comment } = useSelector((state) => state.comment);
  const [postLiked, setPostLiked] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const navigate = useNavigate();
  const [like, setLike] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [post, setPost] = useState([]);
  const [postUser, setPostUser] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/find/${path}`);
        setPostLiked(res.data.fav.includes(user._id) ? true : false);
        setLike(res.data.fav.length);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [path]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`/comments/post/${path}`);
        dispatch(fetchCommentSuccess(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, [path]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/find/" + post.userId);
      setPostUser(res.data);
    };
    fetchUser();
  }, [post]);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/delete/" + post?._id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setOpenComment(!openComment);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    setPostLiked(!postLiked);
    try {
      if (!postLiked) {
        await axios.put("/posts/like/" + post?._id);
        setLike(like + 1);
      } else {
        await axios.put("/posts/unlike/" + post?._id);
        setLike(like - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePostPage">
      <Leftbar />
      <div className={openComment ? "singlePostComment" : "singlePost"}>
        <div className="singlePostContainer">
          <div className="post">
            <div className={openPopup ? "popup-opened" : "popup"}>
              <div className="popupWrapper">
                <div className="popupQuestion">
                  Are you sure to delete this post?
                </div>
                <div className="popupButtons">
                  <button onClick={() => setOpenPopup(false)}>Cancel</button>
                  <button onClick={handleDelete}>Yes</button>
                </div>
              </div>
            </div>
            <div className="postUserInfo">
              <div className="postUserImg">
                <img
                  src={
                    postUser?.avatar
                      ? postUser.avatar
                      : "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                  }
                  alt=""
                />
              </div>
              <Link className="link" to={"/profile/" + post.userId}>
                <div className="postUser">@{postUser?.username} </div>
              </Link>
              •<div className="postDate">{format(post?.createdAt)}</div>
              {user?._id === postUser?._id ? (
                <div
                  className="postDeleteIcon"
                  onClick={() => setOpenPopup(true)}
                >
                  <DeleteOutlineOutlinedIcon />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="postDescInfo">
              <div className="postDesc">{post?.desc}</div>
            </div>
            <div className="postStatistics">
              <div className="postStatisticDatas">
                <span className="postStatisticData">{post?.views} Views</span>
                <span className="postStatisticData">
                  {comment.length} Comments
                </span>
                <span className="postStatisticData">{like} Likes</span>
              </div>
              <div className="postStatisticsIcons">
                <div className="postComment" onClick={handleOpen}>
                  <div className="postIcon">
                    <QuestionAnswerOutlinedIcon />
                  </div>
                  <span>{comment.length}</span>
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
            </div>
          </div>
        </div>
        {openComment ? (
          <NewPost
            postId={post._id}
            type="comment"
            setOpenComment={setOpenComment}
          />
        ) : (
          <div className="commentWrapper">
            <h1 className="postsAboutPost">
              {comment.length > 0
                ? "Here comments posted on this post"
                : "There is no comment on this post"}
            </h1>
            {comment.map((item) => (
              <Post key={item._id} post={item} type />
            ))}
          </div>
        )}
      </div>
      <Rightbar />
    </div>
  );
}
