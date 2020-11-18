import React, {Component} from 'react';
import logos from "../../assets";
import './navbar.css';
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import TTCEapi from "../../services/API/TTCEapi";
import BuyerConnectedSuggestions from "./buyerSuggestions.js"
import NotificationBuyerConnected from "./notificationBuyerCount.js"
import ANavEnquiries from "../ArtistEnquiries/ANavEnquiry"
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../services/utils/changeLang"
import { Row, Col, Container, Label } from "reactstrap";


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { browserHistory } from '../../helpers/history';
import ArtistConnectedSuggestions from './artistSuggestions';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      activeTabClassName: window.location.pathname,
      openMenu: false,
      isnotificationHovered: false,
      ischatHovered: false,
      isfavHovered: false,
      isSearchClicked :false,
      index: null,
      enquiryopen: false,

    };
    this.myenquiries = this.myenquiries.bind(this);
    this.closesearch = this.closesearch.bind(this);


  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleHover(name) {

    let user = JSON.parse(localStorage.getItem("user"));
    console.log(name);
  if (user.refRoleId == 2) {
    switch (name) {
      case "isfavHovered":
        this.setState({
          isfavHovered: !this.state.isfavHovered,
        });
        break;
      case "isnotificationHovered":
        this.setState({
          isnotificationHovered: !this.state.isnotificationHovered,
        });
        break;
      case "ischatHovered":
        this.setState({
          ischatHovered: !this.state.ischatHovered,
        });
        break;
      case "isSearchClicked":
        this.setState({
          isSearchClicked: !this.state.isSearchClicked,
          // isSearchClicked: true,      
        });
        break;

      default:
        break;
    }
  }


   if (user.refRoleId == 1) {
     switch (name) {
       case "isSearchClicked":
         this.setState({
           isSearchClicked: !this.state.isSearchClicked,
          //  isSearchClicked: true,       
         });
         break;

       default:
         break;
     }
   }
  }

  toggleMobileMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  };

  myProfile =() =>{
   debugger;
browserHistory.push("/MyProfile");
    
  }
  myenquiries() {
    browserHistory.push("/enquiriesList")
   
     
   }
   myenquiriesBuyer() {
    browserHistory.push("/buyerEnquiriesList")
   
     
   }

  logout= (event) =>{
   this.props.dispatch(Actions.logout());
   
  }

  closesearch(){
    this.setState({isSearchClicked : !this.state.isSearchClicked})
  }

  buyerDashboard = () => {
    var userData = [];
    userData = JSON.parse(localStorage.getItem('user'));
    var jwtToken = localStorage.getItem('jwtToken');
    var params = {
      "ds47.email": userData.email,
      "ds47.Token": jwtToken,
      "ds46.email": userData.email,
      "ds46.Token": jwtToken,
      "ds48.email": userData.email,
      "ds48.Token": jwtToken,
      "ds44.Token": jwtToken,
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);

    // older 
    // https://datastudio.google.com/embed/reporting/0ede1d26-5dbf-4564-a7c4-4f850493a89f/page/i56cB?params=

    return (
      "https://datastudio.google.com/embed/reporting/1ebd20db-4ec9-4fa3-b7af-cc57a8dbd318/page/iTZoB?params=" +
      encodedParams
    );
  }

  artisanDashboard = () => {
    var userData = [];
    userData = JSON.parse(localStorage.getItem('user'));
    var jwtToken = localStorage.getItem('jwtToken');
    var params = {
      "ds0.Token": jwtToken,
      "ds2.Token": jwtToken,
      "ds12.Token": jwtToken,
      "ds16.Token": jwtToken,
      "ds18.Token": jwtToken,
      "ds22.Token": jwtToken,
      "ds30.Token": jwtToken,
    };
    var paramsAsString = JSON.stringify(params);
    var encodedParams = encodeURIComponent(paramsAsString);

    // older 
    // https://datastudio.google.com/embed/reporting/cef7a3b2-e37f-48a2-9f28-0c3f45a07585/page/RJ8dB?params=
    
    return (
      "https://datastudio.google.com/embed/reporting/f0b5c4e2-1e25-43e8-a200-00697598c275/page/imZoB?params=" +
      encodedParams
    );
  }
  
  ChangeLanguageModalShow=()=>{
    document.getElementById('Changelanguage').style.display='block';
}
ChangeLanguageModalClose=()=>{
  document.getElementById('Changelanguage').style.display='none';
}
changeLang = (data) => {
  localStorage.setItem("i18nextLng", data);
}
componentDidMount(){
  var Languagetran=localStorage.getItem("i18nextLng");
  console.log(localStorage.getItem('i18nextLng')== "hi");
 }
  render() {
    const { results, value } = this.state;
   // debugger
    const ImageUrl = TTCEapi.ImageUrl;
    let user = JSON.parse(localStorage.getItem("user"));
    let isAuthenticated = user !== null;    
    let userTypeId = user.refRoleId;

    return (
      <React.Fragment>
        <nav
          className="menu navbarTransparent navbar-expand-sm"
          onClick={this.toggleMobileMenu}
        >
          {" "}
          {this.state.isSearchClicked ? (
            <div className="searchbarNav inner-addon left-addon">
              <img
                src={logos.searchlogo}
                className="searchIconinTextbox glyphicon"
              ></img>
               {/* <input
                autoFocus
                // onBlur={() => this.toggleHover("isSearchClicked")}
                type="text"
                id="userName"
                className="form-control searchTextbox "
                placeholder="Username"
                name="userName"
                /> */}
              {
                userTypeId == 2 ? (
                  <BuyerConnectedSuggestions cs= {this.closesearch}/>
                ):
                (<ArtistConnectedSuggestions cs= {this.closesearch}/>)
              }
              
            </div>
            ) : null}
          {/* {this.state.isSearchClicked ? (
            <div className="searchbarNav inner-addon right-addon">
              <button
                onClick={() => {
                  browserHistory.push("/home");
                }}
                img={logos.searchlogo}
                // className=" inner-addon right-addon"
                
              ></button>
            </div>
            ) : null} */}
          <ol className={this.state.openMenu ? "mobile_menu" : ""}>
            <li className="menu-item">
              {userTypeId === 2 ? (
                <a
                  href="/home"
                  className={
                    this.state.activeTabClassName === "/" ? "active" : ""
                  }
                >
                  {" "}
                  <img
                    className="navbarLogo"
                    src={logos.mainLogoNavbar}
                  ></img>{" "}
                </a>
              ) : (
                <a
                  href="/home"
                  className={
                    this.state.activeTabClassName === "/" ? "active" : ""
                  }
                >
                  {" "}
                  {/* <img className="navbarLogoA" src={logos.artistMainLogo}></img> */}
                  <img className="navbarLogo" src={logos.mainLogoNavbar}></img>
                </a>
              )}
            </li>
            <li className="menu-item">
              {userTypeId === 2 ? (
                <button className="navButton navbarTransparent navbtn1"
                onClick={() => {
                  browserHistory.push("/buyer-custom-design");
                }}>
                  <img className="navButtonImg" src={logos.navbarbtn1}></img>
                  <span className="navButtonImg">New custom design</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    browserHistory.push("/AddProduct");
                  }}
                  className="navButtonA navbarTransparent navbtn1"
                >
                  <img
                    className="navButtonImgA"
                    src={logos.addnewProduct}
                  ></img>
                  <span className="navButtonImgA">{this.props.t("Pages.object.Add a new product")}</span>
                </button>
              )}
            </li>

            {userTypeId === 1 ? (
              <li className="menu-item">
                <a href="/artisanOrders">
                {this.state.isfavHovered ? (
                  <>
                    <img
                      onMouseEnter={() => this.toggleHover("isfavHovered")}
                      onMouseLeave={() => this.toggleHover("isfavHovered")}
                      className="navButtonImg"
                      src={logos.myOrder}
                    ></img>
                    <span
                      style={{ marginLeft: "10px !important" }}
                      className="myorder myorderwidth col-md-12 col-sm-12"
                    >
                      My Orders
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      onMouseEnter={() => this.toggleHover("isfavHovered")}
                      onMouseLeave={() => this.toggleHover("isfavHovered")}
                      className="navButtonImg"
                      src={logos.myOrder}
                    ></img>
                    <span className="myorder1 myorderwidth col-md-12 col-sm-12">
                      {/* My Orders */}
                      {this.props.t("Pages.object.My Orders")}
                    </span>
                  </>
                )}
                </a>
              </li>
            ) : null}

            <li className="menu-item">
              <img
                onClick={() => this.toggleHover("isSearchClicked")}
                className="navButtonImg"
                src={logos.searchlogo}
              ></img>
              {userTypeId === 1 ? (
                <span className="myorder col-md-12 col-sm-12"> {this.props.t("Pages.object.Search")}</span>
              ) : null}
            </li>

            {userTypeId === 2 ? (
              <li className="menu-item">
                {this.state.isfavHovered ? (
                   <a
                   href="/wishlist"
                   className={
                     this.state.activeTabClassName === "/" ? "active" : ""
                   }
                 >
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg"
                    src={logos.heariconfilled}
                  ></img></a>
                ) : (
                  <a
                   href="/wishlist">
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg"
                    src={logos.favoriteicon}
                  ></img></a>
                )}
              </li>
            ) : null}

            <li className="menu-item">
              {this.state.ischatHovered ? (
                userTypeId === 1 ?
                <a href="/artisanChat">
                <img
                  onMouseEnter={() => this.toggleHover("ischatHovered")}
                  onMouseLeave={() => this.toggleHover("ischatHovered")}
                  className="navButtonImg"
                  src={logos.chat_bubble_filled}
                ></img>
                </a>
                : 
                <a href="/buyerChat">
                <img
                  onMouseEnter={() => this.toggleHover("ischatHovered")}
                  onMouseLeave={() => this.toggleHover("ischatHovered")}
                  className="navButtonImg"
                  src={logos.chat_bubble_filled}
                ></img>
                </a>
              ) : (
                userTypeId === 1 ? 
                <a href="/artisanChat">
                <img
                  onMouseEnter={() => this.toggleHover("ischatHovered")}
                  onMouseLeave={() => this.toggleHover("ischatHovered")}
                  className="navButtonImg"
                  src={logos.chaticon}
                ></img>
                </a>
                :
                <a href="/buyerChat">
                <img
                  onMouseEnter={() => this.toggleHover("ischatHovered")}
                  onMouseLeave={() => this.toggleHover("ischatHovered")}
                  className="navButtonImg"
                  src={logos.chaticon}
                ></img>
                </a>
              )}
              {userTypeId === 1 ? (
                <span className="myorder col-md-12 col-sm-12">{this.props.t("Pages.object.chat")}</span>
              ) : null}
            </li>

            <li className="menu-item">
            {
            userTypeId == 2 ? (
              <NotificationBuyerConnected/>
            ):
            (<NotificationBuyerConnected/>)
          } 
              {this.state.isnotificationHovered ? (
                <a
                href="/B-Notifications"
                className={
                  this.state.activeTabClassName === "/" ? "active" : ""
                }
              >
                <img
                  onMouseEnter={() => this.toggleHover("isnotificationHovered")}
                  onMouseLeave={() => this.toggleHover("isnotificationHovered")}
                  className="navButtonImg"
                  src={logos.belliconfilled}
                ></img></a>
              ) : (
                <a
                href="/B-Notifications"
                className={
                  this.state.activeTabClassName === "/" ? "active" : ""
                }
              >
                <img
                  onMouseEnter={() => this.toggleHover("isnotificationHovered")}
                  onMouseLeave={() => this.toggleHover("isnotificationHovered")}
                  className="navButtonImg"
                  src={logos.notificationsicon}
                ></img></a>
              )}
              {userTypeId === 1 ? (
                <span className="myorder col-md-12 col-sm-12">
                  {this.props.t("Pages.object.notification")}
                </span>
              ) : null}
            </li>

            <li className="menu-item">
              {userTypeId === 2 ? (
                <button className="navButton navbtn2" style={{ width: "11em" }}
                    onClick={this.myenquiriesBuyer} >
                  <img className="navButtonImg1" src={logos.receipticon}></img>
                  <span className="navButtonImg">My Enquiries</span>
                </button>
              ) : (
                <button
                  className="navButtonA navbtn2A"
                  style={{ width: "11em" }}
                  onClick={this.myenquiries}
                >
                  <img className="navButtonImg1" src={logos.receipticon}></img>
                  <span className="navButtonImg">{this.props.t("Pages.object.my enquiry")}</span>
                </button>
              )}
              {this.state.enquiryopen
              ?
              <div className="artistenquiries">
                 <ANavEnquiries></ANavEnquiries>
              </div>
              :
              <div>
              </div>}
            </li>

            <li className="menu-item">
              <a href="#">

                {userTypeId === 1 ? (
                  user.profilePic != null && user.profilePic != "" ? (
                    <img
                      className="navProfileA"
                      src={
                        ImageUrl +
                        "User/" +
                        user.id +
                        "/ProfilePics/" +
                        user.profilePic
                      }
                    ></img>
                  ) : (
                    <img src={logos.usernamelogo}></img>
                  )
                ) : (
                  <img src={logos.usernamelogo}></img>
                )}
              </a>
              <ol className="sub-menu">
                <li
                  className="menu-item"
                  style={{ borderBottom: "2px dashed var(--lightFont)" }}
                >
                  <span className="col-md-11  col-xs-11 col-sm-11 text-center">
                    {user != null ? (
                      <p>
                        {" "}
                        {user.firstName}
                        {"  "} {user.lastName}
                      </p>
                    ) : (
                      "Welcome Guest"
                    )}
                  </span>
                  <span>
                    <img
                      style={{ width: "10px", opacity: "0" }}
                      src={logos.closelogo}
                    ></img>
                  </span>
                </li>
                <li className="menu-item">
                  <span className="col-md-2 col-xs-2 col-sm-2 ">
                    <img
                      style={{ width: "15px" }}
                      src={logos.accountcircleicon}
                    ></img>
                  </span>
                  {userTypeId == 2 ? (
                  <a className=" text-left " onClick={this.myProfile}>
                    My Profile
                  </a>
                  ):
                  (
                    <a className=" text-left " onClick={this.myProfile}>
                   {this.props.t("Pages.object.my profile")}
                  </a> 
                  )}
                </li>
                {userTypeId == 2 ? (
                   <li className="menu-item">
                   <span className="col-md-2  col-xs-2  col-sm-2">
                     <img
                       style={{ width: "15px" }}
                       src={logos.cashregistericon}
                     ></img>
                   </span>
 
                   <a href="/buyerTransactionList">Transactions</a>
                 </li>
                ) : 
                <li className="menu-item">
                <span className="col-md-2  col-xs-2  col-sm-2">
                  <img
                    style={{ width: "15px" }}
                    src={logos.cashregistericon}
                  ></img>
                </span>

                <a href="/TransactionList"> {this.props.t("Pages.object.transactions")}</a>
              </li>}
               
                {userTypeId == 2 ? (
                  <li className="menu-item">
                    <span className="col-md-2  col-xs-2  col-sm-2">
                      <img
                        style={{ width: "15px" }}
                        src={logos.receipticonH}
                      ></img>
                    </span>

                    <a href="/buyerOrders">My orders</a>
                  </li>
                ) : 
                <li className="menu-item">
                    <span className="col-md-2  col-xs-2  col-sm-2">
                      <img
                        style={{ width: "15px" }}
                        src={logos.receipticonH}
                      ></img>
                    </span>

                    <a href="/artisanOrders">
                      {/* My orders2 */}
                      {this.props.t("Pages.object.My Orders")}
                      </a>
                  </li>}
                 {userTypeId == 2 ? (
                  <li className="menu-item">
                    <span className="col-md-2  col-xs-2  col-sm-2">
                      <img
                        style={{ width: "15px" }}
                        src={logos.CustomDesignIcons}
                      ></img>
                    </span>

                    <a href="/Customprod">Custom Design</a>
                  </li>
                ) : null}

                <li className="menu-item">
                  <span className="col-md-2  col-xs-2  col-sm-2">
                    <img
                      style={{ width: "15px" }}
                      src={logos.dashboardicon}
                    ></img>
                  </span>

                  {userTypeId === 2 ?
                  <a href={this.buyerDashboard()} target="_blank">Dashboard</a> : 
                  <a href={this.artisanDashboard()} target="_blank">{this.props.t("Pages.object.dashboard")}</a>
                  }

                  
                </li>
                {userTypeId === 2 ?
                 ""
                   :
                   <li className="menu-item" >
                   <span className="col-md-2  col-xs-2  col-sm-2">
                     <img style={{ width: "15px" }} src={logos.bwtranslate}></img>
                   </span>
                   <p onClick={()=>{this.ChangeLanguageModalShow()}} style={{marginBottom:"0px"}}>
                   <a>{this.props.t("Pages.object.changelanguage")}</a></p>
                   
                 </li>
                  }
               
                
                <li className="menu-item">
                  <span className="col-md-2  col-xs-2  col-sm-2">
                    <img style={{ width: "15px" }} src={logos.helpicon}></img>
                  </span>
                  {/* {userTypeId == 2 ?"":<a href="/">Change Language</a>} */}
                  {userTypeId === 2 ?
                  <a href={TTCEapi.DocumentsURL + "LEGAL%20DISCLAIMER.pdf"}
            target="_blank">Support </a>
            :
            <a href={TTCEapi.DocumentsURL + "LEGAL%20DISCLAIMER.pdf"}
            target="_blank"> {this.props.t("Pages.object.support")}</a>
            }
                </li>
                {isAuthenticated ? (
                  <li className="menu-item">
                    <span className="col-md-2  col-xs-2  col-sm-2">
                      {" "}
                      <img
                        style={{ width: "15px" }}
                        src={logos.logouticon}
                      ></img>
                    </span>
                    {userTypeId === 2 ?
                    <a onClick={this.logout}>Logout</a>
                    :
                    <a onClick={this.logout}>{this.props.t("Pages.object.logout")}</a>
                    }
                  </li>
                ) : null}
              </ol>
            </li>
          </ol>
        </nav>

         {/* _____________________________________________Modal 4 ________________________________________________ */}
  <div id="Changelanguage" class="w3-modal" style={{paddingTop:"200px"}}>
    <div class="w3-modal-content w3-animate-top modalBoxSize" >
        <div class="w3-container buyerMOQAcceptModalContainer">
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.ChangeLanguageModalClose()}>X</h1>
            </Col>
  
        </Row>
        <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 ">
                <h1 className="changelangmodalh1 fontplay">{this.props.t("Pages.object.chooselanguage")}</h1> 
               
                <br/>
            </Col>
        </Row>
       
       
       
        <Row noGutters={true}>
        <Col  
         onClick={() => changeLang("en")}
         className={localStorage.getItem('i18nextLng')=="en"?"col-xs-6 modalchangelangh1Selected":"col-xs-6 modalchangelangh1"}>
            A
            <p className="sublangtext">English</p>
        </Col>
        <Col className= {localStorage.getItem('i18nextLng')=="hi"?"col-xs-6 modalchangelangh1Selected":"col-xs-6 modalchangelangh1"}
        onClick={() => changeLang("hi")}>
        ए
        <p className="sublangtext">हिंदी</p>
            </Col>
        </Row>
                                                                            
        
    </div>
    </div>
</div>

      {/* -------------------------------------------Modal ends   ----------------          */}   

      </React.Fragment>
    );
  }
}


               function mapStateToProps(state) {
                 const {user}  = state
                 console.log("User : ");
                 console.log( user);
                 return { user };
               }

 const connectedLoginPage = connect(mapStateToProps)(NavbarComponent);
 export default withTranslation()(connectedLoginPage);
