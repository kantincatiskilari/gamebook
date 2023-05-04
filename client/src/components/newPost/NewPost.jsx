import "./newPost.css";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { postSuccess } from "../../redux/postSlice";
import { commentSuccess } from "../../redux/commentSlice";
import { useNavigate } from "react-router-dom";

export default function NewPost(type, setOpenComment) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const inputRef = useRef("");
  const handleClick = async (e) => {
    try {
      if (type.type === "comment") {
        type.setOpenComment && type.setOpenComment(false);
        const res = await axios.post("/comments/" + type.postId, {
          desc: inputRef.current.value,
        });
        dispatch(commentSuccess(res.data));
        navigate("/post/" + type.postId);
      } else {
        const res = await axios.post("/posts/", {
          desc: inputRef.current.value,
        });
        dispatch(postSuccess(res.data));
      }
      inputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newPost">
      <div className="newPostTop">
        <div className="newPostImg">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="newPostInput">
          <input type="text" placeholder="What's happening?" ref={inputRef} />
        </div>
      </div>
      <div className="newPostBottom">
        <div className="newPostIcons">
          <div className="newPostIcon">
            <InsertPhotoOutlinedIcon />
          </div>
          <div className="newPostIcon">
            <GifBoxOutlinedIcon />
          </div>
          <div className="newPostIcon">
            <EmojiEmotionsOutlinedIcon />
          </div>
          <div className="newPostIcon">
            <LocationOnOutlinedIcon />
          </div>
        </div>
        <div className="newPostSubmit">
          <button onClick={handleClick}>Send</button>
        </div>
      </div>
    </div>
  );
}
