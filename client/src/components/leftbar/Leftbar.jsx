import "./leftbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const Leftbar = React.memo(function () {
  const { user } = useSelector((state) => state.user);
  const profileId = user ? user._id : "";
  return (
    <div className="leftbar">
      <div className="icon-wrapper">
        <Link className="link" to="/">
          <div className="icon">
            <HomeOutlinedIcon />
            <div>Home</div>
          </div>
        </Link>
        <Link className="link" to="/explore">
          <div className="icon">
            <ExploreOutlinedIcon />
            <div>Explore</div>
          </div>
        </Link>

        <div className="icon">
          <ListOutlinedIcon />
          <div>List</div>
        </div>
        {user ? (
          <Link className="link" to={`/profile/${profileId}`}>
            <div className="icon">
              <PersonOutlineOutlinedIcon />
              <div>Profile</div>
            </div>
          </Link>
        ) : (
          ""
        )}

        <div className="icon">
          <MoreHorizOutlinedIcon />
          <div>More...</div>
        </div>
      </div>
      <Link className="link" to={`/profile/${profileId}`}>
        {user ? (
          <div className="profileWrapper">
            <div className="profileImg">
              <img src={user?.avatar} alt="" />
            </div>
            <div className="accountDetails">@{user?.username}</div>
            <div className="profileIcon">
              <MoreHorizOutlinedIcon />
            </div>
          </div>
        ) : (
          ""
        )}
      </Link>
    </div>
  );
});

export default Leftbar;
