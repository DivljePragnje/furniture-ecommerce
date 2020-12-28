import React, { useState } from "react";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../../actions/orderActions";
import _ from "lodash";
import "./ShippingScreen.styles.scss";

export default function ShippingScreen(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const cartItems = useSelector((state) => state.cartItems);

  if (_.isEmpty(userDetails.userInfo)) {
    props.history.push("/signin");
  } else {
    if (cartItems.length === 0) {
      props.history.push("/collection/all");
    }
  }

  const dispatch = useDispatch();
  const handleShippingAddress = (e) => {
    e.preventDefault();
    const shippingAddress = {
      name,
      surname,
      email,
      address,
      phone,
      postalCode,
      city,
    };
    dispatch(addShippingAddress(shippingAddress));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="shipping-container">
        <form onSubmit={handleShippingAddress}>
          <h1>Shipping Address</h1>
          <input
            type="text"
            placeholder="Name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Surname"
            id="surname"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            required
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            id="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Postal code"
            id="postalcode"
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />

          <button className="button">
            <div id="slide"></div>
            <span>CONTINUE</span>
          </button>
        </form>
      </div>
    </div>
  );
}
