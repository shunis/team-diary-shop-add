import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../hoc/auth";

import Main from "./main/Main";

import Navigation from "../components/Navigation";
import LoginPage from "./Login/LoginPage";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
