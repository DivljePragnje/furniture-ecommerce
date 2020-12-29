import React, { useState, useRef, useEffect } from "react";
import "./DropdownProfile.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut } from "../../actions/userActions.js";

export default function DropdownProfile(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
  const [dropdownClicked, setDropdownClicked] = useState(false);

  const dropdownProfile = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownProfile) {
      if (
        dropdownProfile.current &&
        !dropdownProfile.current.contains(e.target)
      ) {
        setDropdownClicked(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownProfile]);

  const onDropdownClicked = () => {
    dropdownClicked ? setDropdownClicked(false) : setDropdownClicked(true);
  };

  const onButtonClick = (path) => {
    history.push(path);
  };

  const onSignOut = () => {
    dispatch(signOut());
  };

  const renderContent = () => {
    return (
      <div className="dropdown-container-profile">
        <div className="list">
          <button className="button" onClick={(e) => onButtonClick("/profile")}>
            <div id="slide"></div>
            <span>PROFILE</span>
          </button>
          {userInfo.isAdmin ? (
            <button
              className="button"
              onClick={(e) => onButtonClick("/additem")}
            >
              <div id="slide"></div>
              <span>ADD ITEM</span>
            </button>
          ) : (
            <></>
          )}
          <button className="button" onClick={onSignOut}>
            <div id="slide"></div>
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="dropdown-collection" ref={dropdownProfile}>
      <div className="dropdown-header" onClick={onDropdownClicked}>
        <span>{props.userName.toUpperCase()}</span>
        {dropdownClicked ? renderContent() : <></>}
      </div>
    </div>
  );
}
