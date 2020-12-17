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

        <div className="inspiration">
          <div className="text">
            <h1>Furniture Quality</h1>
            <p>
              Based on the idea that the things we accumulate during our
              lifetime are the things that are most dear to us, TTWK pieces are
              designed to be passed down from fathers to sons, generation after
              generation.
            </p>
          </div>
          <img src="/images/others/inspiration.jpg" alt="inspiration" />
        </div>
        <div className="hr"></div>
        <div className="video">
          <iframe
            title="video"
            src="https://www.youtube.com/embed/lvsjucag5VE"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </center>
    </div>
  );
}
