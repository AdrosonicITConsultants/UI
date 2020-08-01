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
import DetailSuggestions from'./components/navbar/DetailSuggestions';
import DetailSuggestionsArtist from './components/navbar/ArtisanDetailSuggestions.js';
import BuyerSelfDesign from './components/Buyer-Custom-Design/BuyerSelfDesign';
import EditBuyerDesign from './components/Buyer-Custom-Design/EditbuyerDesign'
// import DetailSuggestions from'./components/navbar/buyerSearchSuggestion.js';
import Customprod from './components/Custon Products/Customprod';
import AddCustomprod from './components/Custon Products/AddCustomprod';
// import BuyerSuggestions from './components/navbar/buyerSuggestions.js'
// import BuyerDetailSuggestions from'./components/navbar/buyerSearchSuggestion.js';
// import ArtistSuggestions from './components/navbar/artistSuggestions.js';
// import ArtistDetailSuggestions from './components/navbar/artistSearchSuggestion.js';
import AlertModal from './components/modal/AlertModal'
import NotificationBuyerConnected from './components/navbar/notificationBuyerCount.js'
import BuyerNotifications from './components/navbar/buyerNotify.js'
import ArtistDetailSuggestions from './components/navbar/artistSearchSuggestion.js';
import SuccessPopup from './components/ModalComponent/SuccessModal';
import Popup from './components/ModalComponent/EnguiryModal';
import AllEnquiryList from './components/ArtistEnquiries/AllEnquiryList';
import SingleEnquiry from "./components/ArtistEnquiries/SingleEnquiry";
import { PreviewInvoice } from './components/ArtistEnquiries/PreviewInvoice';
import buyerProductTempelate from './components/Buyer-Custom-Design/buyerProductTempelate';
import artisanProductCatelog from './components/Products/artisanProductCatelog';
import { BuyerPreviewInvoice } from './components/BuyerEnquiries/BuyerPreviewInvoice';
// import { BuyerSingleEnquiry } from './components/Abcd/BuyerSingleEnquiry';
import { BuyerAllEnquiryList } from './components/BuyerEnquiries/BuyerAllEnquiryList';
import BuyerSingle from './components/BuyerEnquiries/BuyerSingleEnquiry'
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
          <Route exact path="/detailSuggestions" component={DetailSuggestions}/>
          <Route exact path="/A-detailSuggestions" component={DetailSuggestionsArtist}/>
          <Route exact path="/B-NotificationCount" component={NotificationBuyerConnected}/>
          <Route exact path="/B-Notifications" component={BuyerNotifications}/>
          {/* <Route exact path="/buyerSuggestions" component={BuyerSuggestions}/> */}
          {/* <Route exact path="/buyerDetailSuggestions/:suggestion/:type/:total" component={BuyerDetailSuggestions}/> */}
          {/* <Route exact path="/artistSuggestions" component={ArtistSuggestions}/> */}
          {/* <Route exact path="/artistDetailSuggestions/:suggestion/:type/:total" component={ArtistDetailSuggestions}/> */}
          <PrivateRoute exact path="/demo-video" component={videoPlayer} />
          <PrivateRoute exact path="/home" component={LandingPage} />
          <PrivateRoute exact path="/MyProfile" component={MyProfile} />
          <PrivateRoute exact path="/Artisanself/categories/ProductCategories" component={ProductCategories} />
          <PrivateRoute exact path="/Artisianself/regions/ProductRegions" component={ProductRegions} />

          <PrivateRoute exact path="/Artisanself/artisanbrands/ArtisanProducts" component={ArtisianProducts} />
          <PrivateRoute exact path="/Antaran/categories/ProductCategories" component={AntaranProductCategories} />
          <PrivateRoute exact path="/Antaran/regions/ProductRegions" component={AntaranProductRegions} />
          <PrivateRoute exact path="/products" component={ArtisianProductCategory} />
          <PrivateRoute exact path="/buyer-custom-design" component={BuyerSelfDesign} />
          
          <PrivateRoute exact path="/editBuyerProduct" component={EditBuyerDesign} />
          <PrivateRoute exact path="/enquiriesList" component={AllEnquiryList} />
          <PrivateRoute exact path="/buyerEnquiriesList" component={BuyerAllEnquiryList} />
          <PrivateRoute exact path="/enquiryDetails" component={SingleEnquiry} />
          {/* <PrivateRoute exact path="/buyersenquiryDetails" component={BuyerSingleEnquiry} /> */}
          <PrivateRoute exact path="/buyerEnquiryDetails" component={BuyerSingle} />

          <PrivateRoute exact path="/Preview" component={PreviewInvoice} />
          <PrivateRoute exact path="/BuyerPreview" component={BuyerPreviewInvoice} />


          <PrivateRoute path="/showArtisanProduct" component={artisanProductCatelog} />
          <PrivateRoute exact path="/showBuyerProduct" component={buyerProductTempelate} />

          {/* <PrivateRoute exact path="/Artisanself/categories/ProductCategories" component={ProductCategories} /> */}

          <PrivateRoute path="/Artisanself" component={ArtistSelfDesign} />
          <PrivateRoute path="/EditProduct" component={EditProduct} />
          <PrivateRoute path="/Antaran" component={AntaranCoDesign} />
          <Route  exact path="/Product-Details" component={BuyersProductDetails} />
          <Route  exact path="/wishlist" component={AddWishlist} />
          <Route  exact path="/Customprod" component={AddCustomprod} />
          <Route  exact path="/Modal" component={SuccessPopup} />

         
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
