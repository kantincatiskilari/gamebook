import { useSelector } from "react-redux";
import "./followers.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../redux/userSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Followers({ follower }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      await axios.put("/users/follow/" + follower?._id);
      dispatch(followUser(follower?._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put("/users/unfollow/" + follower?._id);
      dispatch(unfollowUser(follower?._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="followers">
      <div className="followersWrapper">
        <div className="followerImg">
          <LazyLoadImage src={follower?.avatar} alt="" effect="blur"/>
        </div>
        <div className="followerInfo">
          <Link className="link" to={"/profile/" + follower?._id}>
            <div className="followerUsername">@{follower?.username}</div>
          </Link>
          <div className="followergBio">{follower?.bio}</div>
        </div>
        {follower.username !== user.username && (
          <div className="followerButton">
            {user.followings.includes(follower?._id) ? (
              <button
                className="followingFollowerButton"
                onClick={handleUnfollow}
              >
                Unfollow
              </button>
            ) : (
              <button className="defaultFollowerButton" onClick={handleFollow}>
                Follow
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
