import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}> </Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
