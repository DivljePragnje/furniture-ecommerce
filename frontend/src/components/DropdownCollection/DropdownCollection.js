import React, { useRef, useState, useEffect } from "react";
import "./DropdownCollection.styles.scss";
import { useHistory } from "react-router-dom";

export default function DropdownCollection() {
  const dropdpwnCollection = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdpwnCollection) {
      if (
        dropdpwnCollection.current &&
        !dropdpwnCollection.current.contains(e.target)
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
  }, [dropdpwnCollection]);

  const history = useHistory();
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const onDropdownClicked = () => {
    dropdownClicked ? setDropdownClicked(false) : setDropdownClicked(true);
  };

  const onButtonClick = (path) => {
    history.push(path);
  };

  const renderContent = () => {
    return (
      <div className="dropdown-container">
        <div className="list">
          <button
            className="button"
            onClick={(e) => onButtonClick("/collection/all")}
          >
            <div id="slide"></div>
            <span>ALL</span>
          </button>
          <button
            className="button"
            onClick={(e) => onButtonClick("/collection/chair")}
          >
            <div id="slide"></div>
            <span>CHAIRS</span>
          </button>
          <button
            className="button"
            onClick={(e) => onButtonClick("/collection/bench")}
          >
            <div id="slide"></div>
            <span>BENCHES</span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="dropdown-collection" ref={dropdpwnCollection}>
      <div className="dropdown-header" onClick={onDropdownClicked}>
        <span>COLLECTION</span>
        {dropdownClicked ? renderContent() : <></>}
      </div>
    </div>
  );
}
