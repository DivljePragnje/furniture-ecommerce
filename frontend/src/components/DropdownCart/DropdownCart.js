import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./DropdownCart.styles.scss";

export default function DropdownCart() {
  const history = useHistory();
  const cartItems = useSelector((state) => state.cartItems);
  const [cartClicked, setCartClicked] = useState(false);
  const onCartClicked = () => {
    cartClicked === false ? setCartClicked(true) : setCartClicked(false);
  };

  const dropdownCart = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownCart) {
      if (dropdownCart.current && !dropdownCart.current.contains(e.target)) {
        setCartClicked(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownCart]);

  const onAddToCart = () => {
    history.push("/cart");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((element) => {
      totalPrice +=
        (element.price - element.price * element.onDiscount) * element.qty;
    });
    return `$ ${totalPrice.toFixed(2)}`;
  };

  const renderItemDiv = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index}>
          <li className="clearfix">
            <img className="image-small" src={item.image} alt={item.name} />
            <span className="item-name">{item.name}</span>
            <span className="item-price">
              $
              {((item.price - item.onDiscount * item.price) * item.qty).toFixed(
                2
              )}
            </span>
            <span className="item-quantity">Quantity: {item.qty}</span>
          </li>
        </div>
      );
    });
  };
  const renderCartDropDown = () => {
    return (
      <div className="container">
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <i className="fa fa-shopping-cart cart-icon"></i>
            {cartItems.length > 0 && <span> ( {cartItems.length} ) </span>}
            <div className="shopping-cart-total">
              <span className="lighter-text">Total:</span>
              <span className="main-color-text">{calculateTotalPrice()}</span>
            </div>
          </div>

          <ul className="shopping-cart-items">{renderItemDiv()}</ul>
          <center>
            <button className="button" onClick={onAddToCart}>
              <div id="slide"></div>
              <span>CHECKOUT</span>
            </button>
          </center>
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownCart}>
      <span onClick={(e) => onCartClicked(e)}>
        <i className="fa fa-shopping-cart" />
        CART
        {cartItems.length > 0 && <span> ( {cartItems.length} ) </span>}
        {cartClicked === true ? renderCartDropDown() : <></>}
      </span>
    </div>
  );
}
