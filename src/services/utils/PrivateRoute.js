import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoute({ component: Component, item, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        JSON.parse(localStorage.getItem("user"))  ? (
          <Component {...props} item />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
