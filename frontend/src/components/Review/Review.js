import React from "react";
import "./Review.styles.scss";
export default function Review(props) {
  const { userName, comment, rating } = props.review;

  return comment === "" ? (
    <></>
  ) : (
    <div className="review-container">
      <div className="user">
        <i className="fa fa-user fa-2x"></i> <p>{userName}</p>
      </div>
      <div className="comment">
        <p>{comment}</p>
      </div>
      {!rating ? (
        <></>
      ) : (
        <div className="rating">
          <i className="fa fa-star fa-2x"></i>
          <p>{rating}</p>
        </div>
      )}
    </div>
  );
}
