import React from "react";

export default function PriceBox({ price, discount }) {
  const PriceFixed = () => {
    if (price) {
      return price.toFixed(2);
    }
    return price;
  };
  let priceBox =
    discount === 0 ? (
      <div className="row left">
        <p>${PriceFixed()}</p>
      </div>
    ) : (
      <div className="row left">
        <p className="discount">${PriceFixed()}</p>
        <p> ${price - price * discount}</p>
      </div>
    );
  return priceBox;
}
