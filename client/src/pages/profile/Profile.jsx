import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import UserProfile from "../../components/profile/Profile";
import "./profile.css";

const Profile = function () {
  return (
    <div className="profilePage">
      <Leftbar />
      <UserProfile />
      <Rightbar />
    </div>
  );
};

export default Profile;
