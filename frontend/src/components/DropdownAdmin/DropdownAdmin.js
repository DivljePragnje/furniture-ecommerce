import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./DropdownAdmin.styles.scss";

export default function DropdownAdmin() {
  const history = useHistory();
  const cartItems = useSelector((state) => state.cartItems);
  const [adminClicked, setAdminClicked] = useState(false);
  const onAdminClicked = () => {
    adminClicked === false ? setAdminClicked(true) : setAdminClicked(false);
  };

  const dropdownAdmin = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownAdmin) {
      if (dropdownAdmin.current && !dropdownAdmin.current.contains(e.target)) {
        setAdminClicked(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownAdmin]);

  const onButtonClick = (path) => {
    history.push(path);
  };

  const renderAdminDropdown = () => {
    return (
      <div className="dropdown-container-profile">
        <div className="list">
          <button
            className="button"
            onClick={(e) => onButtonClick("/productList")}
          >
            <div id="slide"></div>
            <span>PRODUCT LIST</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownAdmin} className="dropdown-collection">
      <span onClick={(e) => onAdminClicked(e)}>
        ADMIN
        {cartItems.length > 0 && <span> ( {cartItems.length} ) </span>}
        {adminClicked === true ? renderAdminDropdown() : <></>}
      </span>
    </div>
  );
}
