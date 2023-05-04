import "./rightbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/userSlice";
import React from "react";
import GamepadIcon from "@mui/icons-material/Gamepad";
import FollowSkeleton from "../skeletons/followSkeleton/FollowSkeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Rightbar = React.memo(function () {
  const [randomUsers, setRandomUsers] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const res = await axios.get("/users/random/" + user._id);
        const users = await res.data.map((currentUser) => {
          return user._id == currentUser._id
            ? res.data.filter((data) => data._id != user._id)
            : res.data;
        });
        setRandomUsers(users[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRandomUsers();
  }, [user?._id]);

  const handleFollow = async (randomUser) => {
    try {
      await axios.put("/users/follow/" + randomUser?._id);
      dispatch(followUser(randomUser?._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (randomUser) => {
    try {
      await axios.put("/users/unfollow/" + randomUser?._id);
      dispatch(unfollowUser(randomUser?._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="rightbar">
      <div className="whoToFollow">
        <h1 className="whoToFollowTitle">Who to follow?</h1>
        {randomUsers?.length === 0 ? (
          <>
            <FollowSkeleton /> 
            <FollowSkeleton /> 
            <FollowSkeleton />
          </>
        ) : (
          randomUsers?.map((randomUser) => (
            <div className="suggestedUser">
              <div className="suggestedUserImg">
                <LazyLoadImage src={randomUser?.avatar} effect="blur"/>
              </div>
              <Link className="link" to={`/profile/${randomUser?._id}`}>
                <div className="suggestedUsername">@{randomUser?.username}</div>
              </Link>
              <div className="suggestedUserFollow">
                {user?.followings.includes(randomUser?._id) ? (
                  <button
                    onClick={() => handleUnfollow(randomUser)}
                    className="followedUser"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(randomUser)}
                    className="unfollowedUser"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="footer">
        <ul>
          <li>Terms of Services</li>
          <li>Privacy Policy</li>
          <li>Cookies Policy</li>
          <li>Imprint</li>
          <li>Advertising Information</li>
        </ul>
        <ul>
          <li>Company Policy</li>
          <li>About</li>
          <li>Devs</li>
        </ul>
      </div>
      <div className="copyright">
        <Link className="link" to="/">
          <div className="logo">
            <GamepadIcon className="gamepad" />
            gamebook
          </div>
        </Link>
        <span>© 2023 gamebook, Inc.</span>
      </div>
    </div>
  );
});

export default Rightbar;
