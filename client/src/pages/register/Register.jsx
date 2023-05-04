import { registerSchema } from "../../schemas/register";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import "./register.css";

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const registerFormik = useFormik({
    initialValues: {
      registerNickname: "",
      registerEmail: "",
      registerPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: () => {
      handleClick();
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", {
        username: registerFormik.values.registerNickname,
        email: registerFormik.values.registerEmail,
        password: registerFormik.values.registerPassword,
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setErr(true)
    }
  };
  return (
    <div className="login">
      {success ? (
        <>
          <div className="success">
            Register completed successfully. Click Sign in button to explore
            gaming universe.
          </div>
          <Link to="/login">
            <button className="successSign">Sign in</button>
          </Link>
        </>
      ) : (
        <>
          <form className="loginForm" onSubmit={handleClick}>
            <h1 className="loginTitle">Register</h1>
            <div class="input_field">
              <input
                type="text"
                required
                className="formInput"
                id="registerNickname"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.registerNickname}
              />
              <span></span>
              <label>Username</label>
              <div className="registerError">
                {registerFormik.errors.registerNickname}
              </div>
            </div>
            <div class="input_field">
              <input
                type="email"
                required
                className="formInput"
                id="registerEmail"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.registerEmail}
              />
              <span></span>
              <label>Email</label>
              <div className="registerError">
                {registerFormik.errors.registerEmail}
              </div>
            </div>
            <div class="input_field">
              <input
                type="password"
                required
                className="formInput"
                id="registerPassword"
                onChange={registerFormik.handleChange}
                value={registerFormik.values.registerPassword}
              />
              <span></span>
              <label>Password</label>
              <div className="registerError">
                {registerFormik.errors.registerPassword}
              </div>
            </div>
            <button type="submit">Register</button>
            {err && (
              <div className="loginSubmitError">
                Login failed. Please check your credentails.
              </div>
            )}
          </form>
          <div className="loginRegisterButton">
            <span>Already have an account?</span>
            <Link to="/login">
              <button>Sign in</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
