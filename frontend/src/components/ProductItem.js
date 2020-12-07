import React from "react";
import PriceBox from "./PriceBox";

export default function ProductItem(props) {
  const { _id, images, name, price, countInStock, onDiscount } = props.data;

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

  // TODO: Implement Add to Cart
  return (
    <div className="product-item" onClick={onDetailClicked}>
      {renderOptional()}
      <img className="medium" src={images[0]} alt={name}></img>
      <button type="button" className="empty" disabled={countInStock === 0}>
        ADD TO CART
      </button>
      <p className="name">{name}</p>
      <PriceBox price={price} discount={onDiscount} />
    </div>
  );
}
