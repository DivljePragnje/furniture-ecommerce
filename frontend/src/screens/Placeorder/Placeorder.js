import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderItems } from "../../actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import "./Placeorder.styles.scss";
import _ from "lodash";

export default function Placeorder(props) {
  const cartItems = useSelector((state) => state.cartItems);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  if (!userDetails.userInfo) {
    props.history.push("/signin");
  } else {
    if (!cartItems.length === 0) {
      props.history.push("/collection/all");
    } else {
      if (_.isEmpty(shippingAddress)) {
        props.history.push("/shipping");
      }
    }
  }

  const renderCartItems = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index}>
          <hr />
          <p>Item Name: {item.name}</p>
          <p>Item Material: {item.material}</p>
          <p>Item Quantity: {item.qty}</p>
          <p>
            Item Total Price:{" "}
            <b>
              ${" "}
              {(item.qty * (item.price - item.price * item.onDiscount)).toFixed(
                2
              )}
            </b>
          </p>
        </div>
      );
    });
  };

  const onPlaceOrder = () => {
    const order = {
      userId: userDetails.userInfo._id,
      orders: cartItems,
      shippingAddress: shippingAddress,
    };
    dispatch(orderItems(order));
  };

  return (
    <div className="placeorder-container">
      <CheckoutSteps step1 step2 step3 />
      <div className="column">
        <div className="shipping-address">
          <h1>Dilivery Adress</h1>
          <p>
            Full Name: {shippingAddress.name} {shippingAddress.surname}
          </p>
          <p> Mobile Number: {shippingAddress.mobileNumber}</p>
          <p>
            Dilivery Address: {shippingAddress.address}, {shippingAddress.city},{" "}
            {shippingAddress.postalCode}
          </p>
        </div>
        <div>
          <h1>CART</h1>
          {renderCartItems()}
        </div>
        <button onClick={onPlaceOrder}> PLACE ORDER</button>
      </div>
    </div>
  );
}
