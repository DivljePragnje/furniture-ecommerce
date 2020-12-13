import React, { useState } from "react";
import "./Rating.styles.scss";

const stars = [1, 2, 3, 4, 5];

function Rating(props) {
  let rating =
    props.reviews.reduce((a, c) => a + c.rating, 0) / props.reviews.length;
  const numReviews = props.reviews.length;

  const [index, setIndex] = useState(rating);
  const onHoverStar = (e) => {
    setIndex(e.target.dataset.value);
  };

  const renderStars = () => {
    return stars.map((elem) => {
      return (
        <span key={elem}>
          <i
            data-value={elem}
            className={elem <= index ? "fa fa-star" : "fa fa-star-o"}
            onMouseOver={(e) => onHoverStar(e)}
          ></i>
        </span>
      );
    });
  };
  return (
    <div className="rating">
      {renderStars()}
      <span>{numReviews + " reviews"}</span>
    </div>
  );
  /*let rating =
    props.reviews.reduce((a, c) => a + c.rating, 0) / props.reviews.length;
  const numReviews = props.reviews.length;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-start-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fa fa-star"
              : rating >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-start-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? "fa fa-star"
              : rating >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-start-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fa fa-star"
              : rating >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-start-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? "fa fa-star"
              : rating >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-start-o"
          }
        ></i>
      </span>
      <span>{numReviews + " reviews"}</span>
    </div>
  );*/
}

export default Rating;
