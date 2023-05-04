import NewPost from "../newPost/NewPost";
import Post from "../post/Post";
import "./posts.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
} from "../../redux/postSlice";
import PostSkeleton from '../skeletons/postSkeleton/PostSkeleton'

const Posts = React.memo(function () {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const posts = useSelector((state) => state.post);

  useEffect(() => {
    const postFetch = async () => {
      dispatch(fetchStart());
      try {
        const res = await axios.get(`/users/timeline`);
        dispatch(fetchSuccess(res.data));
      } catch (err) {
        dispatch(fetchFailure());
        console.log(err);
      }
    };
    postFetch();
  }, []);

  return (
    <div className="posts">
      {user ? <NewPost /> : ""}
      {posts.post.map((post) => (
        posts.isPending ? <PostSkeleton /> : <Post post={post} key={post._id} />
      ))}
    </div>
  );
});

export default Posts;
