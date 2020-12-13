import React, { useEffect, useState } from "react";
import "./Rating.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { addRating } from "../../actions/productActions";
const stars = [1, 2, 3, 4, 5];

function Rating(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const productDetail = useSelector((state) => state.productDetail);
  const { userInfo } = userDetails;
  const { reviews, ratings, _id } = productDetail.product;

  const dispatch = useDispatch();
  let rating = ratings.reduce((a, c) => a + c.rating, 0) / ratings.length;
  const numReviews = reviews.length;

  const [index, setIndex] = useState(rating);

  const onHoverStar = (e) => {
    setIndex(e.target.dataset.value);
  };
  const onUnhoverStar = (e) => {
    setIndex(rating);
  };

  const onRatingClicked = (e) => {
    if (_.isEmpty(userInfo)) {
      window.alert("You must be logged in to rate this product!");
    } else {
      dispatch(
        addRating(_id, {
          rating: {
            userId: userInfo._id,
            rating: index,
          },
        })
      );
    }
  };

  const renderStars = () => {
    return stars.map((elem) => {
      return (
        <span key={elem}>
          <i
            data-value={elem}
            className={elem <= index ? "fa fa-star" : "fa fa-star-o"}
            onMouseOver={(e) => onHoverStar(e)}
            onMouseLeave={onUnhoverStar}
            onClick={(e) => onRatingClicked(e)}
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
}

export default Rating;
