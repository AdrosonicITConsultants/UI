import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import HomePage from "./components/Homepage/homepage";
import Artistregister from "./components/register/artist/artistRegister";
import Buyerregister from "./components/register/buyer/buyerRegister";
import { memoryHistory, browserHistory } from "./helpers/history";
import videoPlayer from './components/login/videoPlayer';
import { ToastContainer } from "react-toastify";
import ForgotpassRouter from "./components/forgotpassword/forgotpassRouter";
import LandingPage from "./components/landingpage/landingpage";
import PrivateRoute from "../src/services/utils/PrivateRoute";
import ArtistProfile from "../src/components/profile/artistProfile";
import BuyerProfile from "../src/components/profile/buyerProfile";
import AddProduct from "../src/components/Products/addProduct";
import EditProduct from "../src/components/Products/editProduct";
import MyProfile from "../src/components/profile/myProfile";
import ArtistSelfDesign from "../src/components/Artisan_Self_Design/Artisanselfdesign";
import AntaranCoDesign from "../src/components/Antaran_co-design_Collection/AntaranCoDesign"


import i18next from "i18next";

function App() {
  
  return (
    <React.Fragment>
      <Router history={browserHistory}>
        <ToastContainer></ToastContainer>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/buyer-registration" component={Buyerregister} />
          <Route exact path="/artist-registration" component={Artistregister} />
          <Route exact path="/forgot-passwordA" component={ForgotpassRouter} />
          <Route exact path="/forgot-passwordB" component={ForgotpassRouter} />
          <Route exact path="/addProduct" component={AddProduct} />
          
                    <PrivateRoute exact path="/demo-video" component={videoPlayer} />
          <PrivateRoute exact path="/home" component={LandingPage} />
          <PrivateRoute exact path="/MyProfile" component={MyProfile} />
          <Route path="/Artisanself" component={ArtistSelfDesign} />
          <Route path="/EditProduct" component={EditProduct} />

          <Route path="/Antaran" component={AntaranCoDesign} />
          
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
