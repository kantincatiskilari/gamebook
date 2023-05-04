import "./userSearch.css";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser, followUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserSearch() {
  const [user, setUser] = useState();
  const currentUser = useSelector((state) => state.user.user);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/find/user/" + params.username);
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };
    fetchUser();
  }, [params]);

  const handleFollow = async () => {
    setUser();
    try {
      await axios.put("/users/follow/" + user._id);
      dispatch(followUser(user?._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put("/users/unfollow/" + user._id);
      dispatch(unfollowUser(user?._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="userSearchWrapper">
        <Leftbar />
        {user ? (
          <div className="userSearch">
            <div className="userSearchContainer">
              <div className="userSearchImg">
                <img src={user.avatar} />
              </div>
              <div className="userSearchInfo">
                <Link className="link" to={"/profile/" + user._id}>
                  <div className="userSearchUsername">@{user.username}</div>
                </Link>
                <div className="userSearchBio">{user.bio}</div>
              </div>
              <div className="userSearchButton">
                {currentUser?._id !== user?._id ? (
                  currentUser?.followings.includes(user?._id) ? (
                    <button onClick={handleUnfollow} className="followedUser">
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={handleFollow} className="unfollowedUser">
                      Follow
                    </button>
                  )
                ) : (
                  <Link className="link" to={"/profile/" + user._id}>
                    <button>Edit Profile</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="searchAlert">
            there is no user by username @{params.username}...
          </div>
        )}
        <Rightbar />
      </div>
    </>
  );
}
