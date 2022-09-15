import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styling/styles/shards-dashboards.1.1.0.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignIn from "./views/SingIn";
import { getFromLocalStorage } from "./lib/helper";
import { Constants } from "./flux";
import "./App.css";

export default () => {

  const isAuthenticated = getFromLocalStorage(Constants.IS_AUTHENTICATED);

  if (!isAuthenticated || isAuthenticated === "false") {
    return (
      <SignIn />
    )
  }
  else {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          <ToastContainer newestOnTop={true} autoClose={1000} />
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </div>
      </Router>
    )
  }
};
