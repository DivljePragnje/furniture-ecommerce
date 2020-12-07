import React, { useEffect, useState } from "react";
import "./Slideshow.styles.scss";

export default function Slideshow() {
  const contentArray = [
    {
      image: "/images/slideshow/1.jpg",
      title: "Liveable Luxury",
      description: "Combining extraordinary quality with intentional design",
      btn_text: "BROWSE SEATING",
      position: "center",
    },
    {
      image: "/images/slideshow/2.jpg",
      title: "Streamlined Designs",
      description:
        "Sleek, stylish and sophisticated. The perfect match for your home",
      btn_text: "BROWSE LIGHTING",
      position: "bottom-left",
    },
    {
      image: "/images/slideshow/3.jpg",
      title: "Exceptional Quality",
      description: "We work wth the world's finest materials",
      btn_text: "LEARN MORE",
      position: "top-right",
    },
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onNextClicked();
    }, 5000);
    return () => clearTimeout(timer);
  });

  const renderImages = () => {
    return contentArray.map((content, index) => {
      const display = index === currentImage ? "block" : "none";
      return (
        <div key={index} className={`mySlides fade ${display}`}>
          <img src={content.image} alt="dsadsa" />
          {console.log(content.position)}
          <div className={`textbox ${content.position}`}>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <button type="button">{content.btn_text}</button>
          </div>
        </div>
      );
    });
  };

  const renderBullets = () => {
    return contentArray.map((image, index) => {
      return (
        <span
          key={index}
          className={`dot ${index === currentImage ? "active" : ""}`}
          onClick={(e) => onBulletClick(index)}
        ></span>
      );
    });
  };

  const onBulletClick = (index) => {
    setCurrentImage(index);
  };

  const onPrevClicked = () => {
    const index =
      currentImage === 0 ? contentArray.length - 1 : currentImage - 1;
    setCurrentImage(index);
  };

  const onNextClicked = () => {
    const index =
      currentImage === contentArray.length - 1 ? 0 : currentImage + 1;
    setCurrentImage(index);
  };
  return (
    <div>
      <div className="slideshow-container">
        {renderImages()}
        <i className="fa fa-chevron-left prev" onClick={onPrevClicked}></i>
        <i className="fa fa-chevron-right next" onClick={onNextClicked}></i>
      </div>

      <br></br>
      <div className="bullets">{renderBullets()}</div>
    </div>
  );
}
