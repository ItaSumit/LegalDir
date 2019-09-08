import * as React from "react";
import { Route, Switch, Router } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { history } from "../history";
import { Redirect } from "react-router";

import Signin from "./signin";

let configureStore = require("../redux/configureStore.dev");
let store = configureStore.configureStore();

const RouteGuard = (Component: any) => ({ match }: { match: any }) =>
  !store.getState().signinState.isLoggedin ? (
    <Redirect to="/Signin" />
  ) : (
    <Component match={match} />
  );

const Main = (props: any) => {
  return (
    <Router history={history}>
      <ReduxProvider store={store}>
        <div>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route path="/Signin" component={Signin} />
          </Switch>
        </div>
      </ReduxProvider>
    </Router>
  );
};

export default Main;
