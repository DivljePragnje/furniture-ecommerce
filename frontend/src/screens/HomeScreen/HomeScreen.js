import React from "react";

import Slideshow from "../../components/Slideshow/Slideshow";
import "./HomeScreen.styles.scss";

export default function HomeScreen() {
  return (
    <div className="about-container">
      <Slideshow />
      <center>
        <div className="hr"></div>

        <div className="about">
          <h1>Smart Solutions for Modern Living</h1>
          <p>
            Our mission is simple. We want to make beautiful objects for
            everyday living, whether that's a must-have piece of kitchen
            equipment, a clever bedroom storage solution, or a stunning piece of
            art that ties a living space together.
          </p>
        </div>
        <div className="hr"></div>
      </center>
    </div>
  );
}
