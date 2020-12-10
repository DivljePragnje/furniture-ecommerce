import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, resgisterUser } from "../../actions/userActions";
import _ from "lodash";
import "./SignInScreen.styles.scss";

export default function SignInScreen(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, error } = userDetails;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activePanel, setActivePanel] = useState("signIn");

  const onSignInAnimation = () => {
    setActivePanel("signIn");
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  const onSignUpAnimation = () => {
    setActivePanel("signUp");
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    dispatch(resgisterUser({ name, email, password }));
  };
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  return (
    <div className="screen-container">
      <div
        className={`container ${
          activePanel === "signUp" ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          {userRegister.error ? (
            <div className="invalid-message">{userRegister.error}</div>
          ) : (
            ""
          )}
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          {error ? <div className="invalid-message">{error}</div> : ""}

          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={onSignInAnimation}>
                SIGN IN
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={onSignUpAnimation}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
