import axios from "axios";
import { useEffect } from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Post from "../../components/post/Post";
import React from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import "./explore.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFailure, fetchStart, fetchSuccess } from "../../redux/postSlice";
import PostSkeleton from "../../components/skeletons/postSkeleton/PostSkeleton";

const Explore = function () {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      dispatch(fetchStart());
      try {
        const res = await axios.get("/users/explore/posts");
        dispatch(fetchSuccess(res.data));
      } catch (err) {
        console.log(err);
        dispatch(fetchFailure());
      }
    };
    fetchRandomPosts();
  }, []);
  return (
    <>
      <div className="explorerWrapper">
        <Leftbar />
        <div className="postContainer">
          {posts.post?.map((randomPost) =>
            posts.isPending ? (
              <PostSkeleton />
            ) : (
              <Post post={randomPost} key={randomPost._id} />
            )
          )}
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default Explore;
