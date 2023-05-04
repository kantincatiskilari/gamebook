import "./follow.css";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Following from "../../components/following/Following";
import Followers from "../../components/followers/Followers";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import UserSkeleton from "../../components/skeletons/userSkeleton/UserSkeleton";
import { useSelector } from "react-redux";

export default function Follow({ type }) {
  const [followings, setFollowings] = useState([]);
  const [profileUser, setProfileUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const params = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/find/" + params.userId);
      setProfileUser(res.data);
    };
    fetchUser();
  }, [params.userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Promise.all(
          profileUser.followings?.map(async (friendId) => {
            return axios.get("/users/find/" + friendId);
          })
        );
        setFollowings(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [profileUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Promise.all(
          profileUser.followers?.map(async (friendId) => {
            return axios.get("/users/find/" + friendId);
          })
        );
        setFollowers(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [profileUser]);

  return (
    <>
      <div className="followWrapper">
        <Leftbar />
        <div className="followContainer">
          <h1 className="title">
            {type ? "Follower accounts" : "Following accounts"}
          </h1>
          {type
            ? followers.length === 0
              ? user.followers.map(() => <UserSkeleton />)
              : followers.map((follower) => (
                  <Followers follower={follower.data} key={follower._id} />
                ))
            : followings.length === 0
            ? user.followings.map(() => <UserSkeleton />)
            : followings.map((following) => (
                <Following following={following.data} key={following._id} />
              ))}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
