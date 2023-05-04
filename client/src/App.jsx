import "./App.css";
import { Suspense, lazy, useEffect } from "react";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
//import Profile from "./pages/profile/Profile";
//import SinglePost from "./pages/singlePost/SinglePost";
//import Explore from "./pages/explore/Explore";
import UserSearch from "./pages/usersSearch/UserSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Follow from "./pages/follow/Follow";
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';

const Profile = lazy(() => import("./pages/profile/Profile"));
const SinglePost = lazy(() => import("./pages/singlePost/SinglePost"));
const Explore = lazy(() => import("./pages/explore/Explore"));
const Follow = lazy(() => import("./pages/follow/Follow"));

function App() {
  const { user } = useSelector((state) => state.user);
  const cookies = new Cookies();

  useEffect(() => {
    if(!cookies.get("access_token")){
      cookies.set("access_token",user?.access_token)
    }
  },[]);
  
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Suspense fallback="">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile/:profileId"
              element={user ? <Profile /> : <Login />}
            />
            <Route
              path="/post/:postId"
              element={user ? <SinglePost /> : <Login />}
            />
            <Route path="/explore" element={user ? <Explore /> : <Login />} />
            <Route
              path="/:userId/followings"
              element={user ? <Follow /> : <Login />}
            />
            <Route
              path="/:userId/followers"
              element={user ? <Follow type /> : <Login />}
            />
            <Route
              path="/search/:username"
              element={user ? <UserSearch /> : <Login />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
