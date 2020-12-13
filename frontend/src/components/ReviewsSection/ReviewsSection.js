import React from "react";
import Review from "../Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function ReviewsSection(props) {
  const renderReviews = () => {
    return props.reviews.map((review, index) => {
      return <Review key={index} review={review} />;
    });
  };
  return (
    <div className="reviews-container">
      <h1>REVIEWS</h1>
      <ReviewForm productId={props.productId} />
      {renderReviews()}
    </div>
  );
}
