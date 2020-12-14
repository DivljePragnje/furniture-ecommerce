import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileScreen.styles.scss";
import _ from "lodash";
import { updateUser } from "../../actions/userActions";

export default function ProfileScreen(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  if (_.isEmpty(userDetails.userInfo)) {
    props.history.push("/signin");
  }

  useEffect(() => {
    if (!_.isEmpty(userDetails.userInfo)) {
      setName(userDetails.userInfo.name);
      setEmail(userDetails.userInfo.email);
    }
  }, [userDetails.userInfo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        updateUser(userDetails.userInfo.token, { name, email, password })
      );
    }
  };
  return (
    <div className="profile-container">
      <form onSubmit={(e) => handleUpdate(e)}>
        <h1>PROFILE</h1>
        <input
          type="text"
          placeholder="Enter name"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter new password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button>Update profile</button>
      </form>
    </div>
  );
}
