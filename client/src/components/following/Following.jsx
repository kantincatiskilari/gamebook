import "./following.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Following({ following }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleUnfollow = async () => {
    try {
      dispatch(unfollowUser(following?._id));
      await axios.put("/users/unfollow/" + following?._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="following">
      <div className="followingWrapper">
        <div className="followingImg">
          <LazyLoadImage src={following?.avatar} alt="" effect="blur"/>
        </div>
        <div className="followingInfo">
          <Link className="link" to={"/profile/" + following?._id}>
            <div className="followingUsername">@{following?.username}</div>
          </Link>
          <div className="followingBio">{following?.bio}</div>
        </div>
        <div className="followingButton">
          {following?.username !== user.username && (
            <button onClick={handleUnfollow}>Unfollow</button>
          )}
        </div>
      </div>
    </div>
  );
}
