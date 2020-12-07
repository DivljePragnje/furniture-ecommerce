import React from "react";

export default function PriceBox({ price, discount }) {
  let priceBox =
    discount === 0 ? (
      <div className="row left">
        <p>${price.toFixed(2)}</p>
      </div>
    ) : (
      <div className="row left">
        <p className="discount">${price.toFixed(2)}</p>
        <p> ${price - price * discount}</p>
      </div>
    );
  return priceBox;
}
