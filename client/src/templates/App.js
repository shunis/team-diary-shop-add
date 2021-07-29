import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../hoc/auth";

import Main from "./main/Main";

import NavBar from "../components/NavBar";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
