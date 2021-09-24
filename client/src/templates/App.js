import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../hoc/auth";

import Main from "./main/Main";

import Navigation from "../components/Navigation";

//* User
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import FavoritePage from "./favoritePage/FavoritePage";
import AdminPage from "./adminPage/AdminPage";

//* MarketPlace
import MarketPlaceList from "./marketPlace/MarketPlaceList";
import MarketPlaceDetail from "./marketPlace/MarketPlaceDetail";

//* shop 
import LandingPage from "../components/views/LandingPage/LandingPage.js";
import UploadProductPage from "../components/views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "../components/views/DetailProductPage/DetailProductPage";
import CartPage from "../components/views/CartPage/CartPage";
import HistoryPage from "../components/views/HistoryPage/HistoryPage";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />

          {/* //* User */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          <Route exact path="/adminPage" component={Auth(AdminPage, true)} />

          {/* //* Marketplace */}
          <Route exact path="/marketPlace" component={Auth(MarketPlaceList, null)} />
          <Route exact path="/marketPlace/:nftId" component={Auth(MarketPlaceDetail, null)} />

          {/* //* Shop */}
          <Route exact path="/landing" component={Auth(LandingPage, true)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />

        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
