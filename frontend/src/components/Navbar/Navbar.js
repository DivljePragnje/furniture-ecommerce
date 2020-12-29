import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import "./Navbar.styles.scss";
import DropdownCollection from "../DropdownCollection/DropdownCollection.js";

import DropdownProfile from "../DropdownProfile/DropdownProfile.js";
import DropdownCart from "../DropdownCart/DropdownCart";
import NavbarTouch from "./NavbarTouch";
import DropdownAdmin from "../DropdownAdmin/DropdownAdmin";

export default function Navbar() {
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  return (
    <div>
      <header className="navbar">
        <NavbarTouch className="menu" />
        <div className="left-navbar">
          <div>
            <Link to="/">HOME</Link>
          </div>
          <DropdownCollection />
        </div>

        <div className="right-navbar">
          <div>
            <DropdownCart />
          </div>
          <div>
            {_.isEmpty(userInfo) ? (
              <Link to="/signin">SIGN IN</Link>
            ) : (
              <DropdownProfile userName={userInfo.name} />
            )}
          </div>
          <div>
            {_.isEmpty(userInfo) ? (
              <></>
            ) : userInfo.isAdmin ? (
              <DropdownAdmin />
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
