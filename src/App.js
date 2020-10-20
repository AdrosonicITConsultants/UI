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
import SingleCompletedEnquiry from "./components/ArtistEnquiries/SingleCompletedEnquiry";

import { PreviewInvoice } from './components/ArtistEnquiries/PreviewInvoice';
import buyerProductTempelate from './components/Buyer-Custom-Design/buyerProductTempelate';
import artisanProductCatelog from './components/Products/artisanProductCatelog';
import { BuyerPreviewInvoice } from './components/BuyerEnquiries/BuyerPreviewInvoice';
// import { BuyerSingleEnquiry } from './components/Abcd/BuyerSingleEnquiry';
import { BuyerAllEnquiryList } from './components/BuyerEnquiries/BuyerAllEnquiryList';
import BuyerAdvancePayment from "./components/BuyerEnquiries/BuyerAdvancePayment"
import BuyerSingle, { BuyerSingleEnquiry } from './components/BuyerEnquiries/BuyerSingleEnquiry'
import { ClosedBuyerSingleEnquiry } from './components/BuyerEnquiries/BuyerSingleCompletedEnquiry';
import { BuyerAdvancePayment3 } from './components/BuyerEnquiries/BuyerAdvancePayment3';
import BuyerAdvancePayment2 from './components/BuyerEnquiries/BuyerAdvancePayment2' 
import { BuyerAllTransactionList } from './components/BuyerTransaction/BuyerAllTransactionList';
import { BuyerRecentList } from './components/BuyerTransaction/BuyerRecentList';
import BuyerProductview from "./components/Buyer-ProductDetails/BuyerProductView"
import { ArtisanAllTransactionList } from './components/ArtisanTransactions/ArtisanAllTransactionList';
import { ArtisanRecentList } from './components/ArtisanTransactions/ArtisanRecentList';
import { ArtisanHistoryList } from './components/ArtisanTransactions/ArtisanHistoryList';
import BuyerOrderNav from "./components/BuyerOrder/BuyerOrderNav"
import { ArtisanOrderNav } from './components/Artisanorder/ArtisanOrderNav';
import { Buyerorder } from './components/Buyer-MyOrder/Buyerorder';
import { Artisanorder } from './components/Artisan-MyOrder/Artisanorder';
import BuyerRating from './components/Rating/buyerRating';
import { BuyerFaultyOrder } from './components/FaultyOrder/BuyerFaultyOrder';
// import { BuyerCompletedfaultyOrder } from './components/FaultyOrder/BuyerCompletedfaultyOrder';
import { BuyerSingleCompletedOrder } from './components/Buyer-MyOrder/BuyerSingleCompletedOrder';
import ArtisanCompletedOrder from './components/Artisanorder/ArtisanCompletedOrder';
import { ArtisanSingleCompletedOrder } from './components/Artisan-MyOrder/ArtisanSingleCompletedOrder';
import { ArtisanFaultyOrder1 } from './components/FaultyOrder/ArtisanFaultyOrder1';
import { FaultResolved } from './components/FaultyOrder/FaultResolved';
import { BuyerCompletedfaultyOrder } from './components/FaultyOrder-Completed/BuyerCompletedfaultyOrder';
import { CompletedFaultResolved } from './components/FaultyOrder-Completed/CompletedFaultResolved';
import { ArtisanFaultCompletedOrder1 } from './components/FaultyOrder-Completed/ArtisanFaultCompletedOrder1';
import ArtisanRating from './components/Rating/artisanRating';
import ArtisanSelfRating from './components/Rating/artisanSelfRating';
import { ArtisanFaultResolved } from './components/FaultyOrder/ArtisianFaultResolved';
import ArtisanChat from './components/Chat/artisanChat';
import BuyerChat from './components/Chat/buyerChat';
import ViewOldQC from './components/Artisan-MyOrder/viewOldQC';
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
          <PrivateRoute exact path="/buyerTransactionList" component={BuyerAllTransactionList} />
          <PrivateRoute exact path="/TransactionList" component={ArtisanAllTransactionList} />
          <PrivateRoute exact path="/RecentList" component={ArtisanRecentList} />
          <PrivateRoute exact path="/historyList" component={ArtisanHistoryList} />
          <PrivateRoute exact path="/buyerorder" component={Buyerorder} />
          <PrivateRoute exact path="/artisanorder" component={Artisanorder} />




          <PrivateRoute exact path="/buyerRecentTransactionList" component={BuyerRecentList} />


          <PrivateRoute exact path="/enquiryDetails" component={SingleEnquiry} />
          <PrivateRoute exact path="/closedEnquiryDetails" component={SingleCompletedEnquiry} />
          <PrivateRoute exact path="/buyerEnquiryDetails" component={BuyerSingleEnquiry} />
          <PrivateRoute exact path="/closedBuyerEnquiryDetails" component={ClosedBuyerSingleEnquiry} />


          <PrivateRoute exact path="/Preview" component={PreviewInvoice} />
          <PrivateRoute exact path="/BuyerPreview" component={BuyerPreviewInvoice} />

          <PrivateRoute path="/payadvance" component={BuyerAdvancePayment} />
          {/* <PrivateRoute path="/uploaddetails" component={BuyerAdvancePayment2} /> */}
          <PrivateRoute path="/uploadReceiptandSend" component={BuyerAdvancePayment3} />

          
          <PrivateRoute path="/showArtisanProduct" component={artisanProductCatelog} />
          <PrivateRoute exact path="/showBuyerProduct" component={buyerProductTempelate} />
          {/* ORDER ROUTES */}
          <PrivateRoute exact path="/buyerOrders" component={BuyerOrderNav} />
          <PrivateRoute exact path="/artisanOrders" component={ArtisanOrderNav} />
          <PrivateRoute exact path="/faulty" component={BuyerFaultyOrder} />
          <PrivateRoute exact path="/completedorderfaulty" component={BuyerCompletedfaultyOrder} />
          <PrivateRoute exact path="/buyercompletedorder" component={BuyerSingleCompletedOrder} />
          <PrivateRoute exact path="/artisancompletedorder" component={ArtisanSingleCompletedOrder} />
          <PrivateRoute exact path="/artisanfaultreport" component={ArtisanFaultyOrder1} />
          <PrivateRoute exact path="/concernsolved" component={FaultResolved} />
          <PrivateRoute exact path="/concernsolvedartisan" component={ArtisanFaultResolved} />
          <PrivateRoute exact path="/completedconcernsolved" component={CompletedFaultResolved} />
          <PrivateRoute exact path="/artisanfaultreportCompleted" component={ArtisanFaultCompletedOrder1} />

          {/* <PrivateRoute exact path="/buyerOrders" component={buyerProductTempelate} /> */}

          {/* /ORDER ROUTES */}

          {/* <PrivateRoute exact path="/Artisanself/categories/ProductCategories" component={ProductCategories} /> */}

          <PrivateRoute path="/Artisanself" component={ArtistSelfDesign} />
          <PrivateRoute path="/EditProduct" component={EditProduct} />
          <PrivateRoute path="/Antaran" component={AntaranCoDesign} />
          <Route  exact path="/Product-Details" component={BuyersProductDetails} />
          <Route  exact path="/showBArtisanProduct" component={BuyerProductview} />

          <Route  exact path="/wishlist" component={AddWishlist} />
          <Route  exact path="/Customprod" component={AddCustomprod} />
          <Route  exact path="/Modal" component={SuccessPopup} />

          <PrivateRoute exact path="/buyerRating" component={BuyerRating} />
          <PrivateRoute exact path="/artisanRating" component={ArtisanRating} />
          <PrivateRoute exact path="/artisanSelfRating" component={ArtisanSelfRating} />

          <PrivateRoute exact path="/artisanChat" component={ArtisanChat} />
          <PrivateRoute exact path="/buyerChat" component={BuyerChat} />

          <PrivateRoute exact path="/viewOldQC" component={ViewOldQC} />
         
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
