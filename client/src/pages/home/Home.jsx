import Leftbar from "../../components/leftbar/Leftbar";
import Posts from "../../components/posts/Posts";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="homeWrapper">
        <Leftbar />
        <Posts />
        <Rightbar />
      </div>
    </>
  );
}
