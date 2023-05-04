import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess, loginStart } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/login";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleClick();
    },
  });

  const handleClick = async (e) => {
    dispatch(loginStart());
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signin", {
        username: loginFormik.values.username,
        password: loginFormik.values.password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      setErr(true);
    }
  };
  return (
    <div className="login">
      <form className="loginForm">
        <h1 className="loginTitle">Login</h1>
        <div class="input_field">
          <input
            type="text"
            required
            className="formInput"
            id="username"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.username}
          />
          <span></span>
          <label>Username</label>
          <div className="loginError">{loginFormik.errors.username}</div>
        </div>
        <div class="input_field">
          <input
            type="password"
            required
            className="formInput"
            id="password"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.password}
          />
          <span></span>
          <label>Password</label>
          <div className="loginError">{loginFormik.errors.password}</div>
        </div>
        <button onClick={handleClick}>Login</button>
        {err && (
          <div className="loginSubmitError">
            Login failed. Please check your credentails.
          </div>
        )}
      </form>
      <div className="loginRegisterButton">
        <span>Do not have an account?</span>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
