import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions/userActions.js";
import DropdownAdmin from "../DropdownAdmin/DropdownAdmin";
import _ from "lodash";

export default function NavbarTouch() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [menuClicked, setMenuClicked] = useState(false);
  const [collectionClicked, setCollectionClicked] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const cartItems = useSelector((state) => state.cartItems);
  const { userInfo } = userDetails;

  const menuDropdown = useRef(null);

  const onSignOut = () => {
    closeAll();
    dispatch(signOut());
  };

  const onMeniItemClicked = (path) => {
    closeAll();
    history.push(path);
  };

  const onCollectionMenuClicked = () => {
    setProfileClicked(false);
    collectionClicked === true
      ? setCollectionClicked(false)
      : setCollectionClicked(true);
  };

  const onProfileMenuClicked = () => {
    setCollectionClicked(false);
    profileClicked === true
      ? setProfileClicked(false)
      : setProfileClicked(true);
  };

  const handleClickOutside = (e) => {
    if (menuDropdown) {
      if (menuDropdown.current && !menuDropdown.current.contains(e.target)) {
        closeAll();
      }
    }
  };

  const closeAll = () => {
    setProfileClicked(false);
    setCollectionClicked(false);
    setMenuClicked(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuDropdown]);

  const renderCollection = () => {
    return (
      <div>
        <button
          className="button dropdown"
          onClick={(e) => onMeniItemClicked("/collection/all")}
        >
          <div id="slide"></div>
          <span>ALL</span>
        </button>
        <button
          className="button dropdown"
          onClick={(e) => onMeniItemClicked("/collection/chair")}
        >
          <div id="slide"></div>
          <span>CHAIRS</span>
        </button>
        <button
          className="button dropdown"
          onClick={(e) => onMeniItemClicked("/collection/bench")}
        >
          <div id="slide"></div>
          <span>BENCHES</span>
        </button>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div>
        <button
          className="button dropdown"
          onClick={(e) => onMeniItemClicked("/profile")}
        >
          <div id="slide"></div>
          <span>PROFILE</span>
        </button>
        <div>
          {_.isEmpty(userInfo) ? (
            <></>
          ) : userInfo.isAdmin ? (
            <DropdownAdmin className="button dropdown" />
          ) : (
            <></>
          )}
        </div>
        <button className="button dropdown" onClick={(e) => onSignOut()}>
          <div id="slide"></div>
          <span>SIGN-OUT</span>
        </button>
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className="menu-content">
        <div className="menu-list">
          <button className="button" onClick={(e) => onMeniItemClicked("/")}>
            <div id="slide"></div>
            <span>HOME</span>
          </button>
          <button className="button" onClick={onCollectionMenuClicked}>
            <div id="slide"></div>
            <span>COLLECTION</span>
          </button>
          {collectionClicked ? renderCollection() : <></>}
          <button
            className="button"
            onClick={(e) => onMeniItemClicked("/cart")}
          >
            <div id="slide"></div>
            <span>CART</span>
            {cartItems.length > 0 && <span> ( {cartItems.length} ) </span>}
          </button>
          {_.isEmpty(userInfo) ? (
            <button
              className="button"
              onClick={(e) => onMeniItemClicked("/signin")}
            >
              <div id="slide"></div>
              <span>SIGN-IN</span>
            </button>
          ) : (
            <button className="button" onClick={(e) => onProfileMenuClicked()}>
              <div id="slide"></div>
              <span>{userInfo.name}</span>
            </button>
          )}
          {profileClicked ? renderProfile() : <></>}
        </div>
      </div>
    );
  };

  return (
    <div className="menu" ref={menuDropdown}>
      <center>
        <i
          className="fa fa-bars fa-2x"
          onClick={(e) => {
            menuClicked ? setMenuClicked(false) : setMenuClicked(true);
          }}
        ></i>
      </center>
      {menuClicked ? renderMenu() : <></>}
    </div>
  );
}
