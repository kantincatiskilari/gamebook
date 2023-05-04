import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import React, { useRef } from "react";
import GamepadIcon from "@mui/icons-material/Gamepad";

const Navbar = React.memo(function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const profileId = user ? user._id : "";
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  const searchRef = useRef("");

  const handleSearch = () => {
    navigate("/search/" + searchRef.current.value);
    searchRef.current.value = "";
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <Link to="/" className="link">
          <div className="left">
            <div className="logo">
              <GamepadIcon className="gamepad" />
              gamebook
            </div>
          </div>
        </Link>
        {user?.access_token && (
          <div className="center">
            <div className="searchBar">
              <input
                type="text"
                className="search"
                placeholder="Search something..."
                ref={searchRef}
              />
              <SearchIcon onClick={handleSearch} />
            </div>
          </div>
        )}
        <div className="right">
          {user?.access_token ? (
            <>
              <div className="profileUsername">@{user.username}</div>
              <Link to={`/profile/${profileId}`} className="link">
                <div className="profilePic">
                  <img src={user.avatar} />
                </div>
              </Link>
              <Link className="link" to="/login">
                <div
                  className="item"
                  style={{ borderRadius: "5px", color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link className="link" to="/login">
                <div
                  className="item"
                  style={{ borderRadius: "5px", color: "white" }}
                >
                  Login
                </div>
              </Link>
              <Link className="link" to="/register">
                <div
                  className="item"
                  style={{ borderRadius: "5px", color: "white" }}
                >
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Navbar;
