import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/isAuthenticated";

const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoutes;
