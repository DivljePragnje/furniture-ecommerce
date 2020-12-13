import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ReviewForm.styles.scss";
import _ from "lodash";
import { Link } from "react-router-dom";
import { addReview } from "../../actions/productActions";
export default function ReviewForm(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const submitReview = () => {
    dispatch(
      addReview(props.productId, {
        review: {
          userId: userInfo._id,
          userName: userInfo.name,
          comment: comment,
        },
      })
    );
  };

  return _.isEmpty(userInfo) ? (
    <div>
      <center>
        You must be{" "}
        <Link to={`/signin?redirect=/product/${props.productId}`}>
          logged in
        </Link>{" "}
        to post a review
      </center>
    </div>
  ) : (
    <div className="review-form">
      <form onSubmit={submitReview}>
        <textarea
          placeholder="Your review"
          id="review"
          required
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button>SUBMIT REVIEW</button>
      </form>
    </div>
  );
}
