import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import PriceBox from "./PriceBox";

export default function ProductItem(props) {
  const { product } = props;
  const { _id, images, name, price, countInStock, onDiscount } = product;
  const dispatch = useDispatch();

  const onAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product, 1));
  };

  const renderOptional = () => {
    return countInStock === 0 ? (
      <div className="sold-out">SOLD OUT</div>
    ) : onDiscount !== 0 ? (
      <div className="on-sale">{onDiscount * 100}% DISCOUNT</div>
    ) : (
      <></>
    );
  };
  const onDetailClicked = () => {
    props.history.push(`/product/${_id}`);
  };

  return (
    <div className="product-item" onClick={onDetailClicked}>
      {renderOptional()}
      <img className="medium" src={images[0]} alt={name}></img>
      <button
        type="button"
        className="empty"
        disabled={countInStock === 0}
        onClick={(e) => onAddToCart(e)}
      >
        ADD TO CART
      </button>
      <p className="name">{name}</p>
      <PriceBox price={price} discount={onDiscount} />
    </div>
  );
}
