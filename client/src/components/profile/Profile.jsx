import "./profile.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { format } from "timeago.js";
import React from "react";
import {
  followUser,
  unfollowUser,
  updateStart,
  updateFailure,
  updateSuccess,
} from "../../redux/userSlice";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation } from "react-router-dom";
import Post from "../../components/post/Post";


export default function Profile() {
  const path = useLocation().pathname.split("/")[2];
  const [profileUser, setProfileUser] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [bioInput, setBioInput] = useState(false);
  const bioRef = useRef("");
  const [editPage, setEditPage] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [background, setBackground] = useState(null);
  const [avatarName, setAvatarName] = useState("");
  const [backgroundName, setBackgroundName] = useState("");
  const [userPost, setUserPost] = useState([]);

  const PF = "http://localhost:8800/api/images/";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/find/" + path);
        setProfileUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [path]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts/" + path);
        setUserPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [path]);

  const handleFollow = async () => {
    try {
      await axios.put("/users/follow/" + path);
      dispatch(followUser(path));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put("/users/unfollow/" + path);
      dispatch(unfollowUser(path));
    } catch (err) {
      console.log(err);
    }
  };

  const handleBio = async () => {
    dispatch(updateStart());
    try {
      const res = await axios.put("/users/" + profileUser._id, {
        bio: bioRef.current.value,
      });
      dispatch(updateSuccess(res.data));
      setBioInput(false);
      bioRef.current.value = "";
    } catch (err) {
      console.log(err);
      dispatch(updateFailure());
    }
  };

  const handleBioInput = () => {
    setBioInput(!bioInput);
  };

  const handleBackground = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", background);
    try {
      const res = await axios.post("/upload", data);
      setBackgroundName(res.data.filename);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAvatar = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", avatar);
    try {
      const res = await axios.post("/upload", data);
      setAvatarName(res.data.filename);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    dispatch(updateStart());
    try {
      if (avatarName) {
        const res = await axios.put("/users/" + user._id, {
          avatar: PF + avatarName,
        });
        dispatch(updateSuccess(res.data));
      }
      if (backgroundName) {
        const res = await axios.put("/users/" + user._id, {
          background: PF + backgroundName,
        });
        dispatch(updateSuccess(res.data));
      }
      setEditPage(false);
    } catch (err) {
      updateFailure();
      console.log(err);
    }
  };
  return (
    <>
      <div
        className="editProfile"
        style={{ display: editPage ? "block" : "none" }}
      >
        <div className="editProfileHeader">
          <CloseIcon onClick={() => setEditPage(false)} />
          <h3>Edit your profile</h3>
          <button onClick={handleSave}>Save</button>
        </div>
        <div className="profileContainer edit">
          <div
            className="profilePageImgButton"
            style={{
              backgroundImage: `url(${
                backgroundName ? PF + backgroundName : user?.background
              })`,
            }}
          >
            <img src={avatarName ? PF + avatarName : user?.avatar} alt=""/>
            <form
              method="POST"
              action="/upload"
              encType="multipart/form-data"
              className="imageForm"
            >
              <div className="firstAddIcon">
                <label>
                  <AddAPhotoIcon type="submit" />
                  <input
                    type="file"
                    name="image"
                    style={{ display: "none" }}
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </label>
              </div>
              <button
                className="doneButton first"
                type="submit"
                onClick={handleAvatar}
              >
                <DoneIcon />
              </button>
            </form>
            <form
              method="POST"
              encType="multipart/form-data"
              className="imageForm"
            >
              <div className="secondAddIcon">
                <label>
                  <AddAPhotoIcon />
                  <input
                    type="file"
                    name="image"
                    style={{ display: "none" }}
                    onChange={(e) => setBackground(e.target.files[0])}
                  />
                </label>
              </div>
              <button
                className="doneButton second"
                type="submit"
                onClick={handleBackground}
              >
                <DoneIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="profile" style={{ opacity: editPage ? ".2" : "1" }}>
        <div className="profileContainer">
          <div
            className="profilePageImgButton"
            style={{
              backgroundImage: `url(${
                user._id === profileUser._id
                  ? user?.background
                  : profileUser?.background
              })`,
            }}
          >
            <img
              src={
                user?._id === profileUser._id
                  ? user?.avatar
                  : profileUser.avatar
              }
              style={{
                backgroundImage: `url(${
                  user._id === profileUser._id
                    ? user?.background
                    : profileUser?.background
                })`,
              }}
              alt=""
            />
            {user?._id !== profileUser._id ? (
              <button
                className={
                  user?.followings.includes(profileUser._id)
                    ? "followedUser"
                    : "unfollowedUser"
                }
                onClick={
                  user?.followings.includes(profileUser._id)
                    ? handleUnfollow
                    : handleFollow
                }
              >
                {user?.followings.includes(profileUser._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            ) : (
              <button className="editButton" onClick={() => setEditPage(true)}>
                Edit Profile
              </button>
            )}
          </div>
          <div className="profilePageInfo">
            <div className="profilePageUsername">@{profileUser?.username}</div>
            {user?._id !== profileUser._id && (
              <div
                className={
                  profileUser?.bio ? "profilePageBio active" : "profilePageBio"
                }
              >
                {user ? profileUser?.bio : profileUser.bio}
              </div>
            )}
            {user?._id === profileUser._id && (
              <>
                <div className="profilePageBio active">
                  {user?.bio ? user?.bio : ""}
                  <CreateOutlinedIcon onClick={handleBioInput} />
                </div>
                <div
                  className="bioInput"
                  style={{ display: bioInput ? "flex" : "" }}
                >
                  <input
                    type="text"
                    placeholder="Write something about you."
                    ref={bioRef}
                  />
                  <button onClick={handleBio}>Submit</button>
                </div>
              </>
            )}

            <div className="profilePageDate">
              <CalendarMonthIcon />
              <span>Joined in {format(profileUser?.createdAt)}</span>
            </div>
          </div>
          <div className="followStats">
            <Link className="link" to={`/${profileUser._id}/followings`}>
              <span className="followings">
                <span className="count">
                  {user?._id === profileUser?._id
                    ? user?.followings?.length
                    : profileUser?.followings?.length}
                </span>{" "}
                following
              </span>
            </Link>
            <Link className="link" to={`/${profileUser._id}/followers`}>
              <span className="followers">
                <span className="count">
                  {user?._id === profileUser?._id
                    ? user?.followers?.length
                    : profileUser?.followers?.length}
                </span>{" "}
                followers
              </span>
            </Link>
          </div>
        </div>
        {userPost.length === 0 ? (
          <h1 style={{fontSize:'20px', marginLeft:'20px', fontWeight:"600"}}>There is no post to display.</h1>
        ) : (
          userPost.map((post) => <Post post={post} key={post._id} />)
        )}
      </div>
    </>
  );
}
