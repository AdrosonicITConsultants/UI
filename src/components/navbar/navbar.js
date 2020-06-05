import React, {Component} from 'react';
import logos from "../../assets";
import './navbar.css';
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";



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
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleHover(name) {console.log(name);
  
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
        });
        break;
    
      default:
        break;
    }
  }

  toggleMobileMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  };

  myProfile =() =>{
    browserHistory.push("/MyProfile");
  }

  logout= (event) =>{
   this.props.dispatch(Actions.logout());
   
  }

  render() {
    let isAuthenticated = localStorage.getItem("userTypeId") !== null;
    let userTypeId = localStorage.getItem("userTypeId");

    return (
      <React.Fragment>
        <nav
          className="menu navbarTransparent navbar-expand-sm"
          onClick={this.toggleMobileMenu}
        > {
            this.state.isSearchClicked ? <div className="searchbarNav inner-addon left-addon">
              <img
                src={logos.searchlogo}
                className="searchIconinTextbox glyphicon"
              ></img>
              <input
              autoFocus
                onBlur={() => this.toggleHover("isSearchClicked")} 
                type="text"
                id="userName"
                className="form-control searchTextbox "
                placeholder="Username"
                name="userName"
                // onChange={(e) => this.handleChange(e)}
              />
            
            </div>:null
        }
         
          <ol className={this.state.openMenu ? "mobile_menu" : ""}>
            {userTypeId === "2" ? (
              <li className="menu-item">
                <a
                  href="/patientHome"
                  className={
                    this.state.activeTabClassName === "/patientHome"
                      ? "active"
                      : ""
                  }
                >
                  Home
                </a>
              </li>
            ) : null}
            {userTypeId === "1" ? (
              <li className="menu-item">
                <a
                  href="/creditpartnerHome"
                  className={
                    this.state.activeTabClassName === "/creditpartnerHome"
                      ? "active"
                      : ""
                  }
                >
                  Home
                </a>
              </li>
            ) : null}
            {userTypeId === "3" ? (
              <li className="menu-item">
                <a
                  href="/traineeHome"
                  className={
                    this.state.activeTabClassName === "/traineeHome"
                      ? "active"
                      : ""
                  }
                >
                  Home
                </a>
              </li>
            ) : null}
            <li className="menu-item">
              <a
                href="/home"
                className={
                  this.state.activeTabClassName === "/" ? "active" : ""
                }
              >
                <img className="navbarLogo" src={logos.mainLogoNavbar}></img>
              </a>

              <ol className="sub-menu">
                {/* <li class="menu-item"><a href="/aboutCOP">About COP</a></li> */}
              </ol>
            </li>
            <li className="menu-item">
              {/* <a href="/joinTeam" className={(this.state.activeTabClassName === "/joinTeam") || (this.state.activeTabClassName === "/careers") ? "active" : ""}>Custom design inquiry</a> */}
              <button className="navButton navbarTransparent navbtn1">
                <img className="navButtonImg" src={logos.navbarbtn1}></img>
                <span className="navButtonImg">New custom design</span>
              </button>
            </li>

            <li  className="menu-item">
             
              <img onClick={() => this.toggleHover("isSearchClicked")}  className="navButtonImg" src={logos.searchlogo}></img>          
            </li>
          
            <li onMouseEnter={() => this.toggleHover("isfavHovered")} onMouseLeave={() => this.toggleHover("isfavHovered")} className="menu-item">
              {this.state.isfavHovered ? <img className="navButtonImg" src={logos.heariconfilled}></img>
                : <img className="navButtonImg" src={logos.favoriteicon}></img>}
            </li>
            <li className="menu-item">
              {this.state.ischatHovered ? <img onMouseEnter={() => this.toggleHover("ischatHovered")} onMouseLeave={() => this.toggleHover("ischatHovered")}  className="navButtonImg" src={logos.chat_bubble_filled}></img>
                : <img onMouseEnter={() => this.toggleHover("ischatHovered")} onMouseLeave={() => this.toggleHover("ischatHovered")}  className="navButtonImg" src={logos.chaticon}></img>}
            </li>
            <li className="menu-item">
              {this.state.isnotificationHovered ? <img onMouseEnter={() => this.toggleHover("isnotificationHovered")} onMouseLeave={() => this.toggleHover("isnotificationHovered")} className="navButtonImg"  src={logos.belliconfilled}></img> 
                : <img onMouseEnter={() => this.toggleHover("isnotificationHovered")} onMouseLeave={() => this.toggleHover("isnotificationHovered")}  className="navButtonImg" src={logos.notificationsicon}></img>}
                
             
            </li>
            {userTypeId === "3" || userTypeId === null ? (
              <li className="menu-item">
                <button className="navButton navbtn2" style={{ width: "10em" }}>
                  <img className="navButtonImg1" src={logos.receipticon}></img>
                  <span className="navButtonImg">My inquiries</span>
                </button>
                {/* <ol class="sub-menu">
        <li class="menu-item"><a href="/courses-offered">Courses Offered</a></li>
        <li class="menu-item"><a href="#0">Timetable</a></li>
        {!isAuthenticated ?
        <li class="menu-item"><a href="/login">Trainee Sign In</a></li>
        : null
        }
      </ol> */}
              </li>
            ) : null}
           
            <li className="menu-item">
            
              <a
                href="#"
                className={
                  this.state.activeTabClassName === "/testslist" ||
                  this.state.activeTabClassName === "/antibodies"
                    ? "active"
                    : ""
                }
              >
                <img src={logos.usernamelogo}></img>
              </a>
              <ol className="sub-menu">
                <li
                  className="menu-item"
                  style={{ borderBottom: "2px dashed var(--lightFont)" }}
                >
                  <span className="col-md-10  col-xs-10 col-sm-10 text-left"> 
                    {(this.props.user != null) ? <p> {this.props.user.firstName }{"  "} {this.props.user.lastName }</p>
                      : "Welcome Guest" }
                  </span>
                  <span>
                    <img style={{ width: "10px" }} src={logos.closelogo}></img>
                  </span>
                </li>
                <li className="menu-item">
                  <span className="col-md-2 col-xs-2 col-sm-2 ">
                    <img
                      style={{ width: "15px" }}
                      src={logos.accountcircleicon}
                    ></img>
                  </span>

                  <a className=" text-left " onClick={this.myProfile}>My Profile</a>
                </li>
                <li className="menu-item">
                  <span className="col-md-2  col-xs-2  col-sm-2">
                    <img
                      style={{ width: "15px" }}
                      src={logos.cashregistericon}
                    ></img>
                  </span>

                  <a href="/">Transactions</a>
                </li>
                <li className="menu-item">
                  <span className="col-md-2  col-xs-2  col-sm-2">
                    <img
                      style={{ width: "15px" }}
                      src={logos.receipticonH}
                    ></img>
                  </span>

                  <a href="/">My orders</a>
                </li>
                <li className="menu-item">
                  <span className="col-md-2  col-xs-2  col-sm-2">
                    <img
                      style={{ width: "15px" }}
                      src={logos.dashboardicon}
                    ></img>
                  </span>

                  <a href="/">Dashboard</a>
                </li>
                <li className="menu-item">
                  <span className="col-md-2  col-xs-2  col-sm-2">
                    <img style={{ width: "15px" }} src={logos.helpicon}></img>
                  </span>

                  <a href="/">Support</a>
                </li>
                {!isAuthenticated ? (
                  <li className="menu-item">
                    <span className="col-md-2  col-xs-2  col-sm-2">
                      {" "}
                      <img
                        style={{ width: "15px" }}
                        src={logos.logouticon}
                      ></img>
                    </span>

                    <a onClick={this.logout}>Logout</a>
                  </li>
                ) : null}
              </ol>
            </li>
          </ol>
        </nav>
      </React.Fragment>
    );
  }
}


               function mapStateToProps(state) {
                 const {user}  = state
                 return { user };
               }

 const connectedLoginPage = connect(mapStateToProps)(NavbarComponent);
 export default connectedLoginPage;
