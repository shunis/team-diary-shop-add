import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../hoc/auth";

import Main from "./main/Main";

import Navigation from "../components/Navigation";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import FavoritePage from "./favoritePage/FavoritePage";

import MarketPlaceList from "./marketPlace/MarketPlaceList";
import MarketPlaceDetail from "./marketPlace/MarketPlaceDetail";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          <Route exact path="/marketPlace" component={Auth(MarketPlaceList, null)} />
          <Route exact path="/marketPlace/:nftId" component={Auth(MarketPlaceDetail, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
