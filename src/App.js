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
import ProductCategories from './components/Artisan_Self_Design/ProductCategories';
import ProductRegions from './components/Artisan_Self_Design/ProductRegions';
import ArtisianProducts from './components/Artisan_Self_Design/ArtisianProducts';


import AntaranProductCategories from './components/Artisan_Self_Design/AntaranProductCategories';
import AntaranProductRegions from './components/Artisan_Self_Design/AntaranProductRegions';
import BuyersProductDetails from './components/Buyer-ProductDetails/Buyer-ProductDetails';
import BPCarousel from './components/Buyer-ProductDetails/Buyers-Productcarousel';
import ArtisianProductCategories, { ArtisianProductCategory } from "./components/ArtisianProducts/ArtisianProductCategory"
import Wishlist from './components/Awishlist/Wishlist';
import AddWishlist from './components/Awishlist/Addwishlist';
import BuyerSuggestions from './components/navbar/buyerSuggestions.js'
import BuyerDetailSuggestions from'./components/navbar/buyerSearchSuggestion.js';
import ArtistSuggestions from './components/navbar/artistSuggestions.js';
import ArtistDetailSuggestions from './components/navbar/artistSearchSuggestion.js';
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
          <Route exact path="/buyerSuggestions" component={BuyerSuggestions}/>
          <Route exact path="/buyerDetailSuggestions/:suggestion/:type/:total" component={BuyerDetailSuggestions}/>
          <Route exact path="/artistSuggestions" component={ArtistSuggestions}/>
          <Route exact path="/artistDetailSuggestions/:suggestion/:type/:total" component={ArtistDetailSuggestions}/>
          <PrivateRoute exact path="/demo-video" component={videoPlayer} />
          <PrivateRoute exact path="/home" component={LandingPage} />
          <PrivateRoute exact path="/MyProfile" component={MyProfile} />
          <PrivateRoute exact path="/Artisans-elf/categories/ProductCategories" component={ProductCategories} />
          <PrivateRoute exact path="/Artisianself/regions/ProductRegions" component={ProductRegions} />
          <PrivateRoute exact path="/Artisanself/artisanbrands/ArtisanProducts" component={ArtisianProducts} />
          <PrivateRoute exact path="/Artisanself/artisanbrands/ArtisanProducts" component={ArtisianProducts} />
          <PrivateRoute exact path="/Antaran/categories/ProductCategories" component={AntaranProductCategories} />
          <PrivateRoute exact path="/Antaran/regions/ProductRegions" component={AntaranProductRegions} />
          <PrivateRoute exact path="/products" component={ArtisianProductCategory} />

          {/* <PrivateRoute exact path="/Artisanself/categories/ProductCategories" component={ProductCategories} /> */}

          <Route path="/Artisanself" component={ArtistSelfDesign} />
          <Route path="/EditProduct" component={EditProduct} />

          <Route path="/Antaran" component={AntaranCoDesign} />
          <Route path="/Product-Details" component={BuyersProductDetails} />
          <Route   path="/wishlist" component={AddWishlist} />
          {/* <Route   path="/addwishlist" component={AddWishlist} /> */}


        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
